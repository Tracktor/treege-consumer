import { FieldValues } from "@/types/FieldValues";
import { JsonFormValue } from "@/types/JsonFormValue";

export interface OnSubmitReturn {
  data: JsonFormValue[];
  formData: [string, FormDataEntryValue][];
  fieldValues: FieldValues;
}
