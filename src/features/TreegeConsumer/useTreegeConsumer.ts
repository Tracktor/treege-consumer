import { FormEvent, MouseEvent as ReactMouseEvent, useEffect, useMemo, useState } from "react";
import type { TreegeConsumerProps } from "@/features/TreegeConsumer";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import type TreeNode from "@/types/TreeNode";
import formDataToJSON, { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
import getFieldsFromTreePoint from "@/utils/getFieldsFromTreePoint";
import getFieldsFromTreeRest from "@/utils/getFieldsFromTreeRest";
import getNextStepper from "@/utils/getNextStepper";
import initializeFieldValuesFromJson from "@/utils/initializeFieldValuesFromJson/initializeFieldValuesFromJson";

const FIELD_MESSAGE_TYPES = ["select", "radio", "switch", "checkbox"];

export interface OnSubmitReturn {
  data: JsonFormValue[];
  formData: [string, FormDataEntryValue][];
  fieldValues: FieldValues;
}

export interface useTreegeConsumerParams {
  onSubmit?({ data, formData, fieldValues }: OnSubmitReturn): void;
  tree?: TreeNode;
  variant: TreegeConsumerProps["variant"];
  initialValues?: JsonFormValue[];
}

const useTreegeConsumer = ({ tree, onSubmit, variant, initialValues }: useTreegeConsumerParams) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState<number>(0);
  const [fields, setFields] = useState<TreeNode[]>([]);
  const [isLastField, setIsLastField] = useState<boolean>(false);
  const [firstFieldIndex, setFirstFieldIndex] = useState<number>(0);
  const [fieldValues, setFieldValues] = useState<FieldValues>({});
  const initialFields = useMemo(() => getFieldsFromTreePoint({ currentTree: tree }), [tree]);
  const requiredFields = fields?.filter((field) => field.attributes.required);
  const formCanBeSubmit = requiredFields?.every((field) => fieldValues?.[field.attributes.name]);
  const nextStepper = getNextStepper(initialFields);
  const lastFieldHasNoChildren = !initialFields[initialFields.length - 1]?.children.length && !!tree;
  const isStepper = variant === "stepper";
  const isStandard = variant === "standard";

  const handleChangeFormValue = (dataAttribute: ChangeEventField): void => {
    const { value, name, hasMessage, type, isDecision, children } = dataAttribute;
    const isSelectField = FIELD_MESSAGE_TYPES.includes(type || "");
    const isAutoStep = isSelectField && !hasMessage;

    if (isDecision) {
      setFields((prevState) => {
        const decisionSelected = children?.find((child) => child.attributes.name === `${name}:${value}`);
        const indexDecisionField = prevState?.findIndex((item) => item.attributes.name === name);
        const treeRest = prevState?.[indexDecisionField]?.childrenTreeRest;
        const childrenTreeRestDecision = getFieldsFromTreeRest(treeRest);

        const decisionChildrenSelected = getFieldsFromTreePoint({
          currentTree: decisionSelected?.children[0] || null,
          treePath: prevState?.[indexDecisionField]?.treePath,
        });

        const noChildren = !decisionChildrenSelected?.length && !childrenTreeRestDecision?.length;

        // Remove all field after decision
        const initialField = prevState.slice(0, indexDecisionField + 1);

        // if the decision & treeDecision don't have children
        if (noChildren) {
          setIsLastField(true);

          if (isStepper && isAutoStep) {
            // AUTO NEXT STEP
            setActiveFieldIndex((prevFieldIndex) => prevFieldIndex + 1);
          }

          // return Initial Field when decision & treeDecision don't have Children
          return initialField;
        }

        const newFields = [...initialField, ...decisionChildrenSelected, ...childrenTreeRestDecision];

        const lastField = newFields.at(-1);
        const lastFieldIsLeaf = !!lastField?.attributes?.isLeaf;

        if (isStandard) {
          setIsLastField(lastFieldIsLeaf);
        }

        // Check if dataAttribute.event to know if is trigger from onInit or onChange
        // To avoid increment the stepper when the field is trigger from onInit
        if (isStepper && isAutoStep && dataAttribute.event) {
          // AUTO NEXT STEP
          setActiveFieldIndex((prevFieldIndex) => {
            const restNewFields = newFields.slice(prevFieldIndex + 1);
            const stepper = getNextStepper(restNewFields) + 1;

            return prevFieldIndex + stepper;
          });
        }

        return newFields;
      });
    }

    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [name]: value,
    }));

    // AUTO NEXT STEP
    if (isStepper && !isDecision) {
      if (isAutoStep) {
        setActiveFieldIndex((prevFieldIndex) => prevFieldIndex + 1);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isStepper && !isLastField) {
      setActiveFieldIndex((prevActiveFieldIndex) => {
        const restNewFields = fields.slice(prevActiveFieldIndex + 1);
        const stepper = getNextStepper(restNewFields) + 1;
        const nextIndex = prevActiveFieldIndex + stepper;
        const hasNextField = fields?.[nextIndex] !== undefined;

        if (hasNextField) {
          return nextIndex;
        }

        setIsLastField(true);
        return nextIndex;
      });
    }

    if (!isLastField) {
      return;
    }

    const currentFormData = new FormData(event.currentTarget);
    const formData = [...currentFormData];
    const data = formDataToJSON(fieldValues, fields);

    onSubmit?.({ data, fieldValues, formData });
  };

  const handlePrev = (_: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLastField(false);

    setActiveFieldIndex((prevState) => {
      // Revert fields array to DECREMENT stepper !!
      const restNewFields = fields.slice(0, prevState).reverse();
      const stepper = getNextStepper(restNewFields) + 1;
      return prevState - stepper;
    });
  };

  useEffect(() => {
    const formatted = initializeFieldValuesFromJson(initialValues);
    if (formatted) {
      setFieldValues(formatted);
    }
  }, [initialValues]);

  // Initialize fields
  useEffect(() => {
    setFields(initialFields);
  }, [initialFields]);

  // Define last field to submit form & define first field index in stepper mode
  useEffect(() => {
    // Define if the last field is a leaf
    if (isStandard) {
      setIsLastField(lastFieldHasNoChildren);
    }

    // Redefine the first field index if some item field are present in the beginning (presence hidden field)
    if (nextStepper || isStepper) {
      setActiveFieldIndex(nextStepper);
      setFirstFieldIndex(nextStepper);
    }
  }, [isStepper, isStandard, nextStepper, lastFieldHasNoChildren]);

  return {
    activeFieldIndex,
    fields,
    fieldValues,
    firstFieldIndex,
    formCanBeSubmit,
    handleChangeFormValue,
    handlePrev,
    handleSubmit,
    isLastField,
  };
};

export default useTreegeConsumer;
