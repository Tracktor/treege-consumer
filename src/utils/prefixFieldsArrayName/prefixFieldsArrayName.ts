import TreeNode from "@/types/TreeNode";
import prefixFieldName from "@/utils/prefixFieldName";

/**
 * Prefixes the name of each field in the array with the tree path.
 * @param children
 * @param treePath
 */
const prefixFieldsArrayName = (children?: TreeNode[], treePath?: string) => {
  if (!children) {
    return [];
  }

  return children.map(({ name: childrenName, ...rest }) => ({ name: prefixFieldName(childrenName, treePath), ...rest }));
};

export default prefixFieldsArrayName;
