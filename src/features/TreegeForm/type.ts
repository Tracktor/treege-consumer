import type { SelectChangeEvent } from "design-system-tracktor";
import type { ChangeEvent } from "react";

export interface ChangeEventField {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent | ChangeEvent<HTMLInputElement>;
  value: string | boolean;
  name: string;
  type?: string;
  hasMsg?: boolean;
  isLeaf?: boolean;
}
