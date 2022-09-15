import { FormControlLabel, FormGroup, Switch as SwitchDS } from "design-system-tracktor";
import { forwardRef, Ref } from "react";

export interface TextFieldProps {
  label: string;
  name: string;
  inputRef: Ref<any>;
}

const Switch = ({ label, name, inputRef }: TextFieldProps, ref: Ref<unknown | undefined>) => (
  <FormGroup ref={ref}>
    <FormControlLabel label={label} control={<SwitchDS name={name} inputRef={inputRef} />} />
  </FormGroup>
);

export default forwardRef(Switch);
