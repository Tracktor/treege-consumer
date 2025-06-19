import { DetailFieldValues, FieldValues } from "@/types/FieldValues";
import { JsonFormValue } from "@/types/JsonFormValue";

export interface OnSubmitReturn<T = JsonFormValue[], U = [string, FormDataEntryValue][], V = FieldValues, X = DetailFieldValues> {
  data: T | JsonFormValue[];
  formData: U | [string, FormDataEntryValue][];
  fieldValues: V | FieldValues;
  detailFieldValues?: X | DetailFieldValues[];
}
