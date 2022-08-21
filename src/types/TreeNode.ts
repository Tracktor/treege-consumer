export interface TreeNodeField {
  depth: number;
  disabled?: boolean;
  isDecisionField?: boolean;
  isLeaf?: boolean;
  isRoot?: boolean;
  label: string;
  paths: string[];
  required?: boolean;
  step?: string;
  type: string;
  value?: never;
}

export interface TreeNodeValues {
  depth: number;
  disabled?: never;
  isDecisionField?: never;
  isLeaf?: boolean;
  isRoot?: never;
  label: string;
  paths: string[];
  required?: never;
  step?: never;
  type?: never;
  value: string;
}

export type TreeNodeAttributes = TreeNodeField | TreeNodeValues;

export interface TreeNode {
  name: string;
  attributes: TreeNodeAttributes;
  children: TreeNode[];
}
