import { FormControl, FormControlLabel, FormLabel, Radio as RadioDS, RadioGroup } from "design-system";
import { ChangeEvent, forwardRef, Ref } from "react";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode[];
  label: string;
  name: string;
  inputRef: Ref<any>;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  required?: boolean;
}

const Radio = ({ data, label, name, inputRef, onChange, required }: TextFieldProps, ref: Ref<HTMLDivElement>) => (
  <FormControl required={required} ref={ref} fullWidth>
    <FormLabel id={`${name}-label`}>{label}</FormLabel>
    <RadioGroup aria-labelledby={`${name}-label`} name={name} onChange={onChange} defaultValue="">
      {data?.map((option, index) => (
        <FormControlLabel
          key={option.name}
          value={option.name}
          label={option.attributes.label}
          control={<RadioDS inputRef={inputRef} data-index={index} inputProps={{ tabIndex: index }} />}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default forwardRef(Radio);
