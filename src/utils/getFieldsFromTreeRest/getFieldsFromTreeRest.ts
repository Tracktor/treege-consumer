import type TreeNode from "@/types/TreeNode";
import getFieldsFromTreePoint from "@/utils/getFieldsFromTreePoint";

const getFieldsFromTreeRest = (childrenTreeRest?: TreeNode["childrenTreeRest"]): TreeNode[] | [] => {
  let fieldArray: [] | TreeNode[] = [];

  if (!childrenTreeRest) {
    return [];
  }

  for (let i = 0; i < childrenTreeRest.length; i += 1) {
    const { currentTree, treePath } = childrenTreeRest[i];
    const fieldArrayResultFunction = getFieldsFromTreePoint({ currentTree: currentTree.children[0], treePath });
    const lastFieldArrayFunction = fieldArrayResultFunction?.at(-1);

    // if the last element os not a leaf stop de loop and save rest tree in field
    if (!lastFieldArrayFunction?.attributes.isLeaf) {
      const restChildrenTree = childrenTreeRest?.slice(i + 1);

      fieldArrayResultFunction.splice(-1, 1, { ...lastFieldArrayFunction, childrenTreeRest: restChildrenTree } as TreeNode);
      fieldArray = [...fieldArray, ...fieldArrayResultFunction];
      break;
    }

    fieldArray = [...fieldArray, ...fieldArrayResultFunction];
  }

  return fieldArray;
};

export default getFieldsFromTreeRest;
