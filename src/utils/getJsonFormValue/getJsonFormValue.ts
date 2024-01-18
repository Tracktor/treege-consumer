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
    const isSelectOrRadio = type === "select" || type === "radio";

    if (isSelectOrRadio || isDecision) {
      const currentAttributes = isDecision
        ? currentField.children.find((child) => child.name === value)?.attributes
        : currentField.attributes.values?.find((option) => option.value === value);
      console.log(currentAttributes);
      return [
        ...acc,
        { label, name, type, value: { label: currentAttributes?.label || "", value: currentAttributes?.value || "" }, ...(tag && { tag }) },
      ];
    }

    const isBooleanField = ["switch", "checkbox"].includes(type || "");
    return [...acc, { label, name, type, value: isBooleanField ? value === "on" : value, ...(tag && { tag }) }];
  }, []);
}
export default getJsonFormValue;
