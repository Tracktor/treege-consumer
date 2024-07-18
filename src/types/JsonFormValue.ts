import { FieldValue } from "@/types/FieldValues";

export interface JsonFormValue {
  label?: string;
  name: string;
  type?: string;
  value?: FieldValue;
  tag?: string;
}
