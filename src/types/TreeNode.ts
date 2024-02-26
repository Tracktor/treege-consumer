export interface TreeValues {
  id: string;
  label: string;
  value: string;
  message?: string;
}

interface Route {
  url: string;
  searchKey: string;
}

export interface TreeNode {
  name: string;
  attributes:
    | {
        depth: number;
        isDecision?: never;
        isMultiple?: never;
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
        hiddenValue?: never;
        defaultValue?: unknown;
        tag?: string;
        route?: Route;
      }
    | {
        depth: number;
        isDecision?: boolean;
        isMultiple?: boolean;
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
        hiddenValue?: string;
        defaultValue?: unknown;
        tag?: string;
        route?: Route;
      };
  children: TreeNode[];
  treeId?: string;
  treePath?: string;
  childrenTreeRest?: {
    currentTree: TreeNode;
    treePath?: string;
  }[];
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
  hiddenValue?: string;
  defaultValue?: unknown;
  tag?: string;
}
