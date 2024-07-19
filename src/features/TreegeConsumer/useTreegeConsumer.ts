import { FormEvent, MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import { JsonFormValue } from "@/types/JsonFormValue";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import TreeNode from "@/types/TreeNode";
import formDataToJSON from "@/utils/formDataToJSON/formDataToJSON";
import getFieldsFromTreePoint from "@/utils/getFieldsFromTreePoint";
import getFieldsFromTreeRest from "@/utils/getFieldsFromTreeRest";
import getNextStepper from "@/utils/getNextStepper";
import initializeFieldValuesFromJson from "@/utils/initializeFieldValuesFromJson/initializeFieldValuesFromJson";
import isDeepEqual from "@/utils/isDeepEqual";

const FIELD_MESSAGE_TYPES = ["select", "radio", "switch", "checkbox"];

export interface useTreegeConsumerParams {
  onSubmit?({ data, formData, fieldValues }: OnSubmitReturn): void;
  ignoreFields?: string[];
  tree?: TreeNode | null;
  variant: TreegeConsumerProps["variant"];
  initialValues?: JsonFormValue[];
  debug?: boolean;
}

const useTreegeConsumer = ({ tree, onSubmit, variant, initialValues, debug, ignoreFields }: useTreegeConsumerParams) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState<number>(0);
  const [fields, setFields] = useState<TreeNode[]>([]);
  const [isLastField, setIsLastField] = useState<boolean>(false);
  const [firstFieldIndex, setFirstFieldIndex] = useState<number>(0);
  const [fieldValues, setFieldValues] = useState<FieldValues>({});
  const initialFields = useMemo(() => getFieldsFromTreePoint({ currentTree: tree }), [tree]);
  const initialValuesRef = useRef<JsonFormValue[]>();

  const requiredFields = fields?.filter((field) => {
    // Check if the field is ignored
    const isIgnored = ignoreFields?.find((fieldName) => fieldName === field.attributes.name);
    return field.attributes.required && !isIgnored;
  });

  const formCanBeSubmit = requiredFields?.every((field) => fieldValues?.[field.attributes.name]);
  const nextStepper = getNextStepper(initialFields);
  const lastFieldHasNoChildren = !initialFields[(initialFields?.length || 0) - 1]?.children?.length && !!tree;
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
            setActiveFieldIndex(activeFieldIndex + 1);
          }

          // return Initial Field when decision & treeDecision don't have Children
          return initialField;
        }

        const newFields = [...initialField, ...decisionChildrenSelected, ...childrenTreeRestDecision];

        const lastField = newFields.at(-1);
        const lastFieldIsLeaf = !!lastField?.attributes?.isLeaf;
        const nextField = newFields[activeFieldIndex + 1];
        const isNextFieldIgnored = !!ignoreFields?.find((fieldName) => fieldName === nextField?.attributes?.name);

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

            // Skip ignored fields in stepper mode when init
            if (isNextFieldIgnored) {
              return prevFieldIndex + stepper + 1;
            }

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
      // Skip ignored fields in stepper mode when auto step
      if (isAutoStep) {
        setActiveFieldIndex((prevFieldIndex) => {
          const nextField = fields[activeFieldIndex + 1];
          const isNextFieldIgnored = !!ignoreFields?.find((fieldName) => fieldName === nextField?.attributes?.name);
          if (!nextField) {
            setIsLastField(true);
          }

          if (isNextFieldIgnored) {
            if (!nextField?.children?.length) {
              setIsLastField(true);
            }
            return prevFieldIndex + 2;
          }

          return prevFieldIndex + 1;
        });
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // handle next step in stepper mode
    if (isStepper && !isLastField) {
      setActiveFieldIndex((prevActiveFieldIndex) => {
        const restNewFields = fields.slice(prevActiveFieldIndex + 1);
        const stepper = getNextStepper(restNewFields) + 1;
        const nextIndex = prevActiveFieldIndex + stepper;
        const hasNextField = fields?.[nextIndex] !== undefined;
        const nextField = fields[activeFieldIndex + 1];
        const isNextFieldIgnored = !!ignoreFields?.find((fieldName) => fieldName === nextField?.attributes?.name);
        const isNextFieldLeaf = !nextField?.children?.length;

        if (isNextFieldIgnored) {
          if (isNextFieldLeaf) {
            setIsLastField(true);
          }

          // Skip ignored fields in stepper mode when increment
          return nextIndex + 1;
        }

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

    if (debug) {
      console.log({ data, fieldValues, formData });
    }
  };

  const handlePrev = (_: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLastField(false);

    setActiveFieldIndex((prevState) => {
      // Revert fields array to DECREMENT stepper !!
      const restNewFields = fields.slice(0, prevState).reverse();
      const stepper = getNextStepper(restNewFields) + 1;

      const prevField = fields[activeFieldIndex - 1];
      const isPrevFieldIgnored = !!ignoreFields?.find((fieldName) => fieldName === prevField?.attributes?.name);

      // Skip ignored fields in stepper mode when decrement
      if (isPrevFieldIgnored) {
        return prevState - stepper - 1;
      }

      return prevState - stepper;
    });
  };

  // Initialize initial Values
  // Deep compare to avoid reinitialize form value when the initialValues change
  useEffect(() => {
    if (!isDeepEqual(initialValuesRef.current, initialValues)) {
      initialValuesRef.current = initialValues;

      const formatted = initializeFieldValuesFromJson(initialValuesRef.current);
      if (formatted) {
        setFieldValues(formatted);
      }
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
