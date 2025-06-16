type FieldValue = string | boolean | FormDataEntryValue | { label?: string; value?: string } | string[] | File[] | unknown;

interface FieldValues {
  [name: string]: FieldValue;
}

interface TreeFieldValues {
  uuid: string;
  name: string;
  type: string;
  value: FieldValue;
  rawData?: unknown;
}

export type { FieldValues, FieldValue, TreeFieldValues };
