import { TreeNode } from "@/types/TreeNode";

export interface JsonFormValue {
  label: string;
  name: string;
  type?: string;
  value?: string | boolean | FormDataEntryValue;
  tag?: string;
}
/**
 * Get the value of the form in json format
 * @param formData
 * @param fields
 */
function getJsonFormValue(formData: [string, FormDataEntryValue][], fields: TreeNode[]): JsonFormValue[] {
  const formDataMap = Object.fromEntries(formData);

  return Object.entries(formDataMap).reduce((acc: JsonFormValue[], [name, value]) => {
    const currentField = fields.find((field) => field.name === name);
    if (!currentField) {
      return acc;
    }
    const { attributes } = currentField;
    const { type, label, isDecision, tag } = attributes;

    if (isDecision) {
      const decisionValue = currentField.children.find((child) => child.name === value)?.attributes?.label;
      return [...acc, { label, name, type, value: decisionValue, ...(tag && { tag }) }];
    }

    const isBooleanField = ["switch", "checkbox"].includes(type || "");
    return [...acc, { label, name, type, value: isBooleanField ? value === "on" : value, ...(tag && { tag }) }];
  }, []);
}
export default getJsonFormValue;
