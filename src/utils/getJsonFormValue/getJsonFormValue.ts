import { TreeNode } from "@/types/TreeNode";

export interface JsonFormValue {
  label: string;
  name: string;
  type?: string;
  value?: string | boolean | FormDataEntryValue | { label?: string; value?: string };
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
    const isSelect = type === "select" || type === "radio";

    if (isDecision) {
      const decisionValue = currentField.children.find((child) => child.name === value)?.attributes;
      return [...acc, { label, name, type, value: { label: decisionValue?.label, value: decisionValue?.value }, ...(tag && { tag }) }];
    }

    if (isSelect) {
      const selectValue = currentField.attributes.values?.find((option) => option.value === value);
      return [...acc, { label, name, type, value: { label: selectValue?.label, value: selectValue?.value }, ...(tag && { tag }) }];
    }

    const isBooleanField = ["switch", "checkbox"].includes(type || "");
    return [...acc, { label, name, type, value: isBooleanField ? value === "on" : value, ...(tag && { tag }) }];
  }, []);
}
export default getJsonFormValue;
