import { FormControl, FormControlLabel, FormLabel, Radio as RadioDS, RadioGroup } from "design-system-tracktor";
import { ChangeEvent, forwardRef, Ref } from "react";
import useInputs from "@/hooks/useInputs";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode;
  inputRef: Ref<any>;
  required?: boolean;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const Radio = ({ data, inputRef, required, onChange }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField } = useInputs();
  const { name, children, attributes } = data;
  const { label, values } = attributes;

  const options = getOptionsForDecisionsField({ children, values });

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup aria-labelledby={`${name}-label`} name={name} onChange={onChange} defaultValue="">
        {options?.map((option, index) => (
          <FormControlLabel
            key={option.key}
            value={option.value}
            label={option.label}
            control={<RadioDS inputRef={inputRef} data-index={index} inputProps={{ tabIndex: index }} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default forwardRef(Radio);
