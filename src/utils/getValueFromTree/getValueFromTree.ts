import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

/**
 * Get the value from a tree
 * @param tree
 * @param key
 */
const getValueFromTree = (
  tree: JsonFormValue[] | unknown | undefined,
  key: string,
): string | boolean | FormDataEntryValue | { label?: string; value?: string } | string[] | undefined | File[] => {
  const treeItem = tree?.[key as keyof typeof tree] as unknown as JsonFormValue;
  return treeItem && typeof treeItem === "object" ? treeItem.value : undefined;
};

export default getValueFromTree;
