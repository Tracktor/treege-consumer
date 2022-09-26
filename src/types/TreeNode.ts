export interface TreeNodeField {
  depth: number;
  isDecision?: boolean;
  isLeaf?: boolean;
  isRoot?: boolean;
  label: string;
  helperText?: string;
  messages?: { on: string; off: string };
  required?: boolean;
  step?: string;
  type: string;
  value?: never;
  values?: { id: string; label: string; value: string; message?: string }[];
  message?: never;
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
}

export type TreeNodeAttributes = TreeNodeField | TreeNodeValues;

export interface TreeNode {
  name: string;
  attributes: TreeNodeAttributes;
  children: TreeNode[];
}
