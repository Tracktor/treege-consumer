import { TreeNode } from "@/types/TreeNode";

export interface JsonFormValue {
  label: string;
  name: string;
  type: string;
  value: string | boolean;
}

const getJsonFormValue = (formData: [string, FormDataEntryValue][], fields: TreeNode[]) => {
  const formDataEntries = Object.entries(Object.fromEntries(formData));

  const acc: JsonFormValue[] = [];

  formDataEntries.forEach(([name, value]) => {
    const currentField = fields.find((field) => field.name === name);

    if (!currentField) return acc;

    const { attributes } = currentField;
    const { type, label, isDecision } = attributes;

    if (isDecision) {
      const decisionValue = currentField.children.find((child) => child.name === value)?.attributes?.label;

      return [...acc, { label, name, type, value: decisionValue }];
    }

    const isBooleanField = ["switch", "checkbox"].includes(type || "");

    if (isBooleanField) {
      return [...acc, { label, name, type, value: value === "on" }];
    }

    // Past version
    // const isSelect = ["select"].includes(type || "");
    // if (isSelect) {
    //   const { values } = attributes;
    //   const selectValue = values?.find((v) => v.value === value)?.label || "";
    //
    //   return [...acc, { label, name, type, value: selectValue }];
    // }

    return [...acc, { label, name, type, value }];
  });

  return acc;
};

export default getJsonFormValue;
