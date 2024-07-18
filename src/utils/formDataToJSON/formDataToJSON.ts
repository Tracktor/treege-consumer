import { FieldValues, FieldValue } from "@/types/FieldValues";
import { JsonFormValue } from "@/types/JsonFormValue";
import TreeNode from "@/types/TreeNode";

/**
 * Get the current attributes of the field
 * @param currentField
 * @param isSelectOrRadio
 * @param isDecision
 * @param value
 */
const getCurrentAttributes = (currentField: TreeNode, isSelectOrRadio: boolean, isDecision: boolean | undefined, value?: FieldValue) => {
  if (isSelectOrRadio || isDecision) {
    if (isDecision) {
      const decisionChild = currentField.children.find((child) => child.attributes.value === value);
      return decisionChild?.attributes || null;
    }
    const option = currentField.attributes.values?.find((opt) => opt.value === value);
    return option || null;
  }

  return null;
};

/**
 * Get the value of the form in json format
 * @param fieldValues
 * @param fields
 */
const formDataToJSON = (fieldValues: FieldValues, fields: TreeNode[]): JsonFormValue[] =>
  Object.entries(fieldValues).reduce((acc: JsonFormValue[], [name, value]) => {
    const currentField = fields.find((field) => field.attributes.name === name);
    if (!currentField) {
      return acc;
    }

    const { attributes } = currentField;
    const { type, label, isDecision, tag } = attributes;
    const isSelectOrRadio = type === "select" || type === "radio";
    const currentAttributes = getCurrentAttributes(currentField, isSelectOrRadio, isDecision, value);
    const newValue = isSelectOrRadio || isDecision ? { label: currentAttributes?.label, value: currentAttributes?.value } : value;

    acc.push({
      label,
      name,
      type,
      value: newValue,
      ...(tag && { tag }),
    });

    return acc;
  }, []);

export default formDataToJSON;
