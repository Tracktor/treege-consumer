import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

/**
 * Get the value from a tree
 * @param formValues
 * @param key
 */
const getValueFromTree = (
  formValues: JsonFormValue | JsonFormValue[] | unknown | undefined,
  key: string,
): string | boolean | FormDataEntryValue | { label?: string; value?: string } | string[] | File[] | undefined => {
  if (Array.isArray(formValues)) {
    const foundItem = formValues.find((item) => item[key]);
    if (foundItem) {
      console.log("foundItem[key]", foundItem[key]);
      return foundItem[key] || undefined;
    }
  }

  const treeItem = formValues?.[key as keyof typeof formValues] as unknown as JsonFormValue;
  return treeItem && typeof treeItem === "object" ? treeItem.value : undefined;
};

export default getValueFromTree;
