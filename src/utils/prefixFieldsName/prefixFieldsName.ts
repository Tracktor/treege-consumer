import type { TreeNode } from "@/types/TreeNode";
import { prefixName } from "@/utils";

const prefixFieldsName = (children?: TreeNode[], treePath?: string) => {
  if (!children) {
    return [];
  }

  return children.map(({ name: childrenName, ...rest }) => ({ name: prefixName(childrenName, treePath), ...rest }));
};

export default prefixFieldsName;
