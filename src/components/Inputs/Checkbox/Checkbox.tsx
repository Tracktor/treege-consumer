import { Checkbox as CheckboxDS, FormControlLabel, FormGroup } from "design-system";
import { forwardRef, Ref } from "react";

export interface TextFieldProps {
  label: string;
  name: string;
  inputRef: Ref<any>;
}

const Checkbox = ({ label, name, inputRef }: TextFieldProps, ref: Ref<unknown | undefined>) => (
  <FormGroup ref={ref}>
    <FormControlLabel label={label} control={<CheckboxDS name={name} inputRef={inputRef} />} />
  </FormGroup>
);

export default forwardRef(Checkbox);
