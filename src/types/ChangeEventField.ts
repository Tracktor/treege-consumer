import type { SelectChangeEvent } from "@tracktor/design-system";
import type { ChangeEvent, SyntheticEvent } from "react";
import TreeNode from "@/types/TreeNode";

export default interface ChangeEventField {
  event?:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | ChangeEvent<HTMLInputElement>
    | SelectChangeEvent<string | string[]>
    | SyntheticEvent
    | undefined;
  value: string | boolean | { label: string; value: string } | string[] | unknown;
  name: string;
  type?: string;
  hasMessage?: boolean;
  isLeaf?: boolean;
  isDecision?: boolean;
  children?: TreeNode[];
  isRequiredAndEmpty?: boolean;
}
