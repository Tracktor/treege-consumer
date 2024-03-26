export default interface FieldValues {
  [name: string]: {
    value: unknown;
    mustBeCompleted: boolean;
  };
}
