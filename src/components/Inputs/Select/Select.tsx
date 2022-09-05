import { FormControl, InputLabel, MenuItem, OutlinedInput, Select as SelectDS, SelectChangeEvent } from "design-system";
import { forwardRef, Ref } from "react";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode;
  inputRef: Ref<any>;
  required?: boolean;
  onChange?(event: SelectChangeEvent): void;
}

const Select = ({ data, inputRef, required, onChange }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const { name, children, attributes } = data;
  const { label, isDecision } = attributes;

  const options = isDecision
    ? children.map((option) => ({ key: option.name, label: option.attributes.label, value: option.name }))
    : attributes.values?.map((option) => ({ key: option.id, label: option.label, value: option.value }));

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <InputLabel id={`${name}-label`} shrink>
        {label}
      </InputLabel>
      <SelectDS
        labelId={`${name}-label`}
        id={name}
        label={label}
        name={name}
        onChange={onChange}
        defaultValue=""
        inputRef={inputRef}
        input={<OutlinedInput notched label={label} />}
      >
        {options?.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectDS>
    </FormControl>
  );
};
export default forwardRef(Select);
