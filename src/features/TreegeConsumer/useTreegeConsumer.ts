import { isDeepEqualObject } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { TreegeConsumerProps } from "@/features/TreegeConsumer/TreegeConsumer";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues, DetailFieldValues } from "@/types/FieldValues";
import { JsonFormValue } from "@/types/JsonFormValue";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import formDataToJSON from "@/utils/formDataToJSON/formDataToJSON";
import getFieldsFromTreePoint from "@/utils/getFieldsFromTreePoint/getFieldsFromTreePoint";
import getFieldsFromTreeRest from "@/utils/getFieldsFromTreeRest/getFieldsFromTreeRest";
import initializeFieldValuesFromJson from "@/utils/initializeFieldValuesFromJson/initializeFieldValuesFromJson";

export interface useTreegeConsumerParams {
  onSubmit?({ data, formData, fieldValues }: OnSubmitReturn): void;
  ignoreFields?: string[];
  tree?: TreegeConsumerProps["tree"];
  initialValues?: TreegeConsumerProps["initialValues"];
  debug?: TreegeConsumerProps["debug"];
  disabledSubmitButton?: TreegeConsumerProps["disabledSubmitButton"];
  options?: TreegeConsumerProps["options"];
}

const useTreegeConsumer = ({
  tree,
  onSubmit,
  initialValues,
  debug,
  ignoreFields,
  disabledSubmitButton,
  options,
}: useTreegeConsumerParams) => {
  const [fields, setFields] = useState<TreeNode[]>([]);
  const [isLastField, setIsLastField] = useState<boolean>(false);
  const [fieldValues, setFieldValues] = useState<FieldValues>({});
  const [detailFieldValues, setDetailFieldValues] = useState<DetailFieldValues[]>([]);
  const initialFields = useMemo(() => getFieldsFromTreePoint({ currentTree: tree }), [tree]);
  const initialValuesRef = useRef<JsonFormValue[]>();

  const requiredFields = fields?.filter((field) => {
    // Check if the field is ignored
    const isIgnored = ignoreFields?.find((fieldName) => fieldName === field.attributes.name);
    return field.attributes.required && !isIgnored;
  });

  const formCanBeSubmit = disabledSubmitButton ? false : requiredFields?.every((field) => fieldValues?.[field.attributes.name]);
  const lastFieldHasNoChildren = !initialFields[(initialFields?.length || 0) - 1]?.children?.length && !!tree;

  const handleChangeFormValue = (dataAttribute: ChangeEventField): void => {
    const { value, name, isDecision, children, rawData } = dataAttribute;

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
        const initialField = prevState?.slice(0, indexDecisionField + 1);

        // if the decision & treeDecision don't have children
        if (noChildren) {
          setIsLastField(true);

          // return Initial Field when decision & treeDecision don't have Children
          return initialField;
        }

        const newFields = [...initialField, ...decisionChildrenSelected, ...childrenTreeRestDecision];

        const lastField = newFields.at(-1);
        const lastFieldIsLeaf = !!lastField?.attributes?.isLeaf;

        setIsLastField(lastFieldIsLeaf);

        return newFields;
      });
    }

    const safeValue = value && typeof value === "object" && "value" in value ? value.value : value;

    setDetailFieldValues((prevEntries) => {
      const field = fields.find((f) => f.attributes.name === name);
      if (!field) return prevEntries;

      const existingIndex = prevEntries.findIndex((entry) => entry.uuid === field.uuid);

      const updatedEntry: DetailFieldValues = {
        name,
        rawData,
        type: field.attributes.type || "text",
        uuid: field.uuid,
        value: safeValue,
      };

      if (existingIndex !== -1) {
        const newEntries = [...prevEntries];
        newEntries[existingIndex] = updatedEntry;
        return newEntries;
      }

      return [...prevEntries, updatedEntry];
    });

    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the current form element from the event
    const form = event.currentTarget;

    // Check if the form is valid
    if (!form.checkValidity() && !options?.noValidate) {
      // If the form is not valid, we need to find the first invalid field

      // Get all form elements (this is more React-friendly than querySelectorAll)
      // form.elements contains all form controls in DOM order
      const formElements = form.elements;

      // Find the first invalid element
      // We convert to array to use the find method
      const invalidElement = Array.from(formElements).find(
        (element) =>
          // We check only elements that have a checkValidity method
          // (inputs, selects, textareas)
          element instanceof HTMLElement && "checkValidity" in element && !(element as HTMLInputElement).checkValidity(),
      ) as HTMLElement;

      // If we found an invalid element, focus it
      if (invalidElement) {
        invalidElement.focus();
      }

      // Display error messages on all fields
      // Note: reportValidity() doesn't consistently focus the first field
      // across all browsers, that's why we manually focus it above
      form.reportValidity();

      // Stop form submission
      return;
    }

    if (!isLastField) {
      return;
    }

    const currentFormData = new FormData(event.currentTarget);
    const formData = [...currentFormData];
    const data = formDataToJSON(fieldValues, fields);

    onSubmit?.({ data, detailFieldValues, fieldValues, formData });

    if (debug) {
      // console.log({ data, detailFieldValues, fieldValues, formData });
    }
  };

  // Initialize initial Values
  useEffect(() => {
    // Deep compare to avoid reinitialize, because react use shallow compare to compare object
    if (isDeepEqualObject(initialValuesRef.current, initialValues)) {
      return;
    }

    initialValuesRef.current = initialValues;

    const formatted = initializeFieldValuesFromJson(initialValuesRef.current);

    if (formatted) {
      setFieldValues(formatted);
    }
  }, [initialValues]);

  // Initialize fields
  useEffect(() => {
    setFields(initialFields);
  }, [initialFields]);

  // Define last field to submit form
  useEffect(() => {
    setIsLastField(lastFieldHasNoChildren);
  }, [lastFieldHasNoChildren]);

  return {
    detailFieldValues,
    fields,
    fieldValues,
    formCanBeSubmit,
    handleChangeFormValue,
    handleSubmit,
    isLastField,
  };
};

export default useTreegeConsumer;
