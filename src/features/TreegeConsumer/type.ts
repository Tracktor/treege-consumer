import type { SelectChangeEvent } from "@tracktor/design-system";
import type { ChangeEvent, SyntheticEvent } from "react";
import type TreeNode from "@/types/TreeNode";

export interface ChangeEventField {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent | ChangeEvent<HTMLInputElement> | SyntheticEvent;
  value: string | boolean | { label: string; value: string } | unknown;
  name: string;
  type?: string;
  hasMessage?: boolean;
  isLeaf?: boolean;
  isDecision?: boolean;
  children?: TreeNode[];
}
