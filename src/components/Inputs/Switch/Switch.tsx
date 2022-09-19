import { FormControl, FormControlLabel, FormGroup, FormHelperText, Switch as SwitchDS } from "design-system-tracktor";
import { forwardRef, Ref } from "react";

export interface TextFieldProps {
  label: string;
  helperText?: string;
  name: string;
  inputRef: Ref<any>;
}

const Switch = ({ label, helperText, name, inputRef }: TextFieldProps, ref: Ref<unknown | undefined>) => (
  <FormControl fullWidth>
    <FormGroup ref={ref}>
      <FormControlLabel label={label} control={<SwitchDS name={name} inputRef={inputRef} />} />
    </FormGroup>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default forwardRef(Switch);
