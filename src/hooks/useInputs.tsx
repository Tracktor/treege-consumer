import type { TreeNode, TreeNodeField } from "@/types/TreeNode";

export interface GetOptionsForDecisionsFieldParams {
  children: TreeNode[];
  values: TreeNodeField["values"];
}

export interface GetOptionsForDecisionsFieldReturn {
  label: string;
  value: string;
  key: string;
}

const useInputs = () => {
  const getOptionsForDecisionsField = ({ children, values }: GetOptionsForDecisionsFieldParams): GetOptionsForDecisionsFieldReturn[] => {
    if (values) {
      return values?.map((option) => ({ key: option.id, label: option.label, value: option.value }));
    }

    return children.map((option) => ({ key: option.name, label: option.attributes.label, value: option.name }));
  };

  return { getOptionsForDecisionsField };
};

export default useInputs;
