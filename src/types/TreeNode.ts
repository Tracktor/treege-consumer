export interface TreeValues {
  id: string;
  label: string;
  value: string;
  message?: string;
}

export interface Params {
  id: string;
  key: string;
  value: string;
}

interface PathKey {
  object?: string;
  value?: string;
  label?: string;
  image?: string;
}

export interface Route {
  url?: string;
  searchKey?: string;
  pathKey?: PathKey;
  params?: Params[];
}

export interface TreeNode {
  name: string;
  attributes:
    | {
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
        hiddenValue?: never;
        defaultValue?: unknown;
        tag?: string;
        route?: Route;
        parentRef?: string;
        isMultiple?: boolean;
        initialQuery?: boolean;
      }
    | {
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
        route?: Route;
        parentRef?: string;
        isMultiple?: boolean;
        initialQuery?: boolean;
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

export default TreeNode;
