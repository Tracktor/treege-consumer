type FieldValue = string | boolean | FormDataEntryValue | { label?: string; value?: string } | string[] | File[] | unknown;

interface FieldValues {
  [name: string]: FieldValue;
}

export type { FieldValues, FieldValue };
