import { FormControl, InputLabel, MenuItem, OutlinedInput, Select as SelectDS, SelectChangeEvent } from "design-system";
import { forwardRef, Ref } from "react";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode[];
  label: string;
  name: string;
  inputRef: Ref<any>;
  onChange?(event: SelectChangeEvent): void;
  required?: boolean;
}

const Select = ({ data, label, name, inputRef, onChange, required }: TextFieldProps, ref: Ref<HTMLDivElement>) => (
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
      {data?.map((option) => (
        <MenuItem key={option.name} value={option.name}>
          {option.attributes.label}
        </MenuItem>
      ))}
    </SelectDS>
  </FormControl>
);

export default forwardRef(Select);
