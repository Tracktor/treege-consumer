import type { TreeNode } from "@/types/TreeNode";

type Mock = { fields?: TreeNode[]; output: number };

const emptyFields: Mock = {
  fields: [],
  output: 0,
};

const fieldsWithNextFieldNoHidden: Mock = {
  fields: [],
  output: 0,
};

export { emptyFields, fieldsWithNextFieldNoHidden };
