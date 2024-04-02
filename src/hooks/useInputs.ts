import TreeNode, { TreeNodeField } from "@/types/TreeNode";

export interface GetOptionsForDecisionsFieldParams {
  children: TreeNode[];
  values: TreeNodeField["values"];
}

export interface GetOptionsForDecisionsFieldReturn {
  message?: string;
  label: string;
  value: string;
  key: string;
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
      key: option.name,
      label: option.attributes.label,
      message: option.attributes?.message,
      value: option.attributes?.value,
    }));
  };

  const getMessageByValue = ({ options, value }: { options: GetOptionsForDecisionsFieldReturn[]; value: string }) =>
    options.find((item) => item.value === value)?.message || "";

  return { getMessageByValue, getOptionsForDecisionsField };
};

export default useInputs;
