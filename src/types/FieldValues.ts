export default interface FieldValues {
  [name: string]: string | boolean | FormDataEntryValue | { label?: string; value?: string } | string[] | File[];
}
