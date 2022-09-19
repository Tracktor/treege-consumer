import { Checkbox as CheckboxDS, FormControl, FormControlLabel, FormGroup, FormHelperText } from "design-system";
import { forwardRef, Ref } from "react";

export interface TextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
}

const Checkbox = ({ label, name, helperText, inputRef }: TextFieldProps, ref: Ref<unknown | undefined>) => (
  <FormControl fullWidth>
    <FormGroup ref={ref}>
      <FormControlLabel label={label} control={<CheckboxDS name={name} inputRef={inputRef} />} />
    </FormGroup>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default forwardRef(Checkbox);
