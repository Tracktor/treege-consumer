import type { TreeNode } from "@/types/TreeNode";
import prefixFieldName from "@/utils/prefixFieldName";

const prefixFieldsArrayName = (children?: TreeNode[], treePath?: string) => {
  if (!children) {
    return [];
  }

  return children.map(({ name: childrenName, ...rest }) => ({ name: prefixFieldName(childrenName, treePath), ...rest }));
};

export default prefixFieldsArrayName;
