import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

/**
 * Get the value from a tree
 * @param formValues
 * @param key
 */
const getFormValueFromName = (
  formValues: JsonFormValue | JsonFormValue[] | unknown | undefined,
  key: string,
): string | boolean | FormDataEntryValue | { label?: string; value?: string } | string[] | File[] | undefined => {
  if (Array.isArray(formValues)) {
    const foundItem = formValues.find((item) => item[key]);
    return foundItem?.[key];
  }

  const treeItem = formValues?.[key as keyof typeof formValues] as unknown as JsonFormValue;
  return treeItem && typeof treeItem === "object" ? treeItem.value : undefined;
};

export default getFormValueFromName;
