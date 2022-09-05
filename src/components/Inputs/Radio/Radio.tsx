import { FormControl, FormControlLabel, FormLabel, Radio as RadioDS, RadioGroup } from "design-system";
import { ChangeEvent, forwardRef, Ref } from "react";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode;
  inputRef: Ref<any>;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const Radio = ({ data, inputRef, onChange }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const { name, children, attributes } = data;
  const { label, required, isDecision } = attributes;

  const options = isDecision
    ? children.map((option) => ({ key: option.name, label: option.attributes.label, value: option.name }))
    : attributes.values?.map((option) => ({ key: option.id, label: option.label, value: option.value }));

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
