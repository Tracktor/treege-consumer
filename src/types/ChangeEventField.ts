import { SelectChangeEvent } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { ChangeEvent, SyntheticEvent } from "react";

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
