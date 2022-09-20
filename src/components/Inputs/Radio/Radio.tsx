import { Alert, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio as RadioDS, RadioGroup } from "design-system-tracktor";
import { ChangeEvent, forwardRef, Ref, useState } from "react";
import useInputs from "@/hooks/useInputs";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<any>;
  required?: boolean;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const Radio = ({ data, helperText, inputRef, required, onChange }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { name, children, attributes } = data;
  const { label, values } = attributes;
  const [message, setMessage] = useState<string | undefined>("");

  const options = getOptionsForDecisionsField({ children, values });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    onChange?.(e);
    setMessage(getMessageByValue({ options, value }));
  };

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup aria-labelledby={`${name}-label`} name={name} onChange={handleChange} defaultValue="">
        {options?.map((option, index) => (
          <FormControlLabel
            key={option.key}
            value={option.value}
            label={option.label}
            control={<RadioDS inputRef={inputRef} data-index={index} inputProps={{ tabIndex: index }} />}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {message && (
        <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </FormControl>
  );
};

export default forwardRef(Radio);
