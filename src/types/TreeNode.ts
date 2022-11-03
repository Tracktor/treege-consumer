interface TreeValues {
  id: string;
  label: string;
  value: string;
  message?: string;
}

export interface TreeNodeField {
  depth: number;
  isDecision?: boolean;
  isLeaf?: boolean;
  isRoot?: boolean;
  label: string;
  helperText?: string;
  messages?: { on?: string; off?: string };
  required?: boolean;
  step?: string;
  type: string;
  value?: never;
  values?: TreeValues[];
  message?: never;
  tree?: TreeNode;
  treePath?: string;
}

export interface TreeNodeValues {
  depth: number;
  isDecision?: never;
  isLeaf?: boolean;
  isRoot?: never;
  label: string;
  helperText?: string;
  messages?: never;
  required?: never;
  step?: never;
  type?: never;
  value: string;
  values?: never;
  message?: string;
  tree?: never;
  treePath?: never;
}

export type TreeNodeAttributes = TreeNodeField | TreeNodeValues;

export type ChildrenTreeRest = { currentTree: TreeNode; treePath?: string };

export interface TreeNode {
  name: string;
  attributes: TreeNodeAttributes;
  children: TreeNode[];
  treeId?: string;
  treePath?: string;
  childrenTreeRest?: ChildrenTreeRest[];
}
