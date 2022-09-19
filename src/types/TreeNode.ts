export interface TreeNodeField {
  depth: number;
  isDecision?: boolean;
  isLeaf?: boolean;
  isRoot?: boolean;
  label: string;
  helperText?: string;
  required?: boolean;
  step?: string;
  type: string;
  value?: never;
  values?: { id: string; label: string; value: string }[];
}

export interface TreeNodeValues {
  depth: number;
  isDecision?: never;
  isLeaf?: boolean;
  isRoot?: never;
  label: string;
  helperText?: string;
  required?: never;
  step?: never;
  type?: never;
  value: string;
  values?: never;
}

export type TreeNodeAttributes = TreeNodeField | TreeNodeValues;

export interface TreeNode {
  name: string;
  attributes: TreeNodeAttributes;
  children: TreeNode[];
}
