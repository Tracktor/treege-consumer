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

  return children.map(({ attributes, ...rest }) => ({
    ...rest,
    attributes: { ...attributes, name: prefixFieldName(attributes.name, treePath) },
  }));
};

export default prefixFieldsArrayName;
