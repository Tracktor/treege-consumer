import type { TreeNode, TreeNodeField } from "@tracktor/types-treege";

export interface GetOptionsForDecisionsFieldParams {
  children: TreeNode[];
  values: TreeNodeField["values"];
}

export interface GetOptionsForDecisionsFieldReturn {
  key: string;
  label?: string;
  message?: string;
  value: string;
}

/**
 * useInputs hook
 */
const useInputs = () => {
  const getOptionsForDecisionsField = ({ children, values }: GetOptionsForDecisionsFieldParams): GetOptionsForDecisionsFieldReturn[] => {
    if (values) {
      return values?.map((option) => ({ key: option.id, label: option.label, message: option?.message, value: option.value }));
    }

    return children.map((option) => ({
      key: option.attributes.name,
      label: option.attributes.label,
      message: option.attributes?.message,
      value: option.attributes?.value || "",
    }));
  };

  const getMessageByValue = ({ options, value }: { options: GetOptionsForDecisionsFieldReturn[]; value: string }) =>
    options.find((item) => item.value === value)?.message || "";

  return { getMessageByValue, getOptionsForDecisionsField };
};

export default useInputs;
