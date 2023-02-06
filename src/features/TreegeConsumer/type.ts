import type { SelectChangeEvent } from "@tracktor/design-system";
import type { ChangeEvent } from "react";
import type { TreeNode } from "@/types/TreeNode";

export interface ChangeEventField {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent | ChangeEvent<HTMLInputElement>;
  value: string | boolean;
  name: string;
  type?: string;
  hasMessage?: boolean;
  isLeaf?: boolean;
  isDecision?: boolean;
  children?: TreeNode[];
}
