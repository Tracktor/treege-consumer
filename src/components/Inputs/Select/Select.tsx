import { FormControl, InputLabel, MenuItem, OutlinedInput, Select as SelectDS, SelectChangeEvent } from "design-system-tracktor";
import { forwardRef, Ref } from "react";
import useInputs from "@/hooks/useInputs";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode;
  inputRef: Ref<any>;
  required?: boolean;
  onChange?(event: SelectChangeEvent): void;
}

const Select = ({ data, inputRef, required, onChange }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField } = useInputs();
  const { name, children, attributes } = data;
  const { label, values } = attributes;

  const options = getOptionsForDecisionsField({ children, values });

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
