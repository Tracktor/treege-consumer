import TreeNode from "@/types/TreeNode";
import { isTreeNode } from "@/types/TypeGuards";

interface GetFieldsFormTreePointParams<T = unknown> {
  currentTree?: T | TreeNode | null;
  fieldArrayAcc?: TreeNode[];
  restTreeAcc?: TreeNode["childrenTreeRest"];
  treePath?: string;
}

const getFieldsFromTreePoint = ({
  currentTree,
  fieldArrayAcc = [],
  restTreeAcc = [],
  treePath,
}: GetFieldsFormTreePointParams): TreeNode[] => {
  if (!currentTree || !isTreeNode(currentTree)) {
    return [];
  }

  let fieldArray: TreeNode[] = [...fieldArrayAcc];
  let restTreeArray: TreeNode["childrenTreeRest"] = [...restTreeAcc];

  if (!currentTree.attributes?.tree) {
    fieldArray = [
      ...fieldArray,
      {
        ...currentTree,
        ...(treePath && { treePath }),
        // set childrenRestTree
        ...(currentTree?.children?.length > 1 && restTreeArray.length && { childrenTreeRest: restTreeArray }),
        attributes: { ...currentTree.attributes, name: currentTree.attributes?.name },
      },
    ];
  } else if (currentTree.children.length) {
    // get in history tree just tree with children
    restTreeArray = [{ currentTree, ...(treePath && { treePath }) }, ...restTreeAcc];
  }

  // if is Tree added CurrentTree in memory for come back at the node children
  if (currentTree.attributes?.tree) {
    return getFieldsFromTreePoint({
      currentTree: currentTree.attributes?.tree,
      fieldArrayAcc: fieldArray,
      restTreeAcc: restTreeArray,
      treePath: currentTree?.attributes?.treePath,
    });
  }

  // get Children node
  if (currentTree?.children?.length === 1) {
    return getFieldsFromTreePoint({
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

    return getFieldsFromTreePoint({
      currentTree: firstHistoryTree.currentTree.children[0] || null,
      fieldArrayAcc: fieldArray,
      restTreeAcc: restTreeArray,
      treePath: firstHistoryTree?.treePath,
    });
  }

  // on Decision => function stopped and return current array field with childrenRestTree if exist
  return fieldArray;
};

export default getFieldsFromTreePoint;
