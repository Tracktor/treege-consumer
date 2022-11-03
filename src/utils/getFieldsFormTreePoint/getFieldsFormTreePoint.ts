import type { ChildrenTreeRest, TreeNode } from "@/types/TreeNode";
import { prefixName } from "@/utils";

const getFieldsFormTreePoint = ({
  currentTree,
  fieldArrayAcc = [],
  restTreeAcc = [],
  treePath,
}: {
  currentTree: TreeNode | null;
  fieldArrayAcc?: TreeNode[];
  restTreeAcc?: ChildrenTreeRest[];
  treePath?: string;
}): TreeNode[] => {
  let fieldArray = [...fieldArrayAcc];
  let restTreeArray = [...restTreeAcc];

  if (!currentTree) {
    return [];
  }

  if (!currentTree.attributes?.tree) {
    fieldArray = [
      ...fieldArray,
      {
        ...currentTree,
        ...(treePath && { treePath }),
        // set childrenRestTree
        ...(currentTree?.children?.length > 1 && restTreeArray.length && { childrenTreeRest: restTreeArray }),
        name: prefixName(currentTree.name, treePath),
      },
    ];
  } else if (currentTree.children.length) {
    // get in history tree just tree with children
    restTreeArray = [{ currentTree, ...(treePath && { treePath }) }, ...restTreeAcc];
  }

  // if is Tree added CurrentTree in memory for come back at the node children
  if (currentTree.attributes?.tree) {
    return getFieldsFormTreePoint({
      currentTree: currentTree.attributes?.tree,
      fieldArrayAcc: fieldArray,
      restTreeAcc: restTreeArray,
      treePath: currentTree?.attributes?.treePath,
    });
  }

  // get Children node
  if (currentTree?.children?.length === 1) {
    return getFieldsFormTreePoint({
      currentTree: currentTree?.children?.[0],
      fieldArrayAcc: fieldArray,
      restTreeAcc: restTreeArray,
      treePath,
    });
  }

  // Consume restTreeArray
  if (restTreeArray.length && currentTree?.children?.length <= 1) {
    const firstHistoryTree = restTreeArray[0];
    restTreeArray.shift();

    return getFieldsFormTreePoint({
      currentTree: firstHistoryTree.currentTree.children[0] || null,
      fieldArrayAcc: fieldArray,
      restTreeAcc: restTreeArray,
      treePath: firstHistoryTree?.treePath,
    });
  }

  // on Decision => fonction stopped and return current array field with childrenRestTree if exist
  return fieldArray;
};

export default getFieldsFormTreePoint;
