import { Alert, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch as SwitchDS } from "design-system-tracktor";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";

export interface TextFieldProps {
  label: string;
  helperText?: string;
  name: string;
  inputRef: Ref<any>;
  messages?: { on?: string; off?: string };
}

const Switch = ({ label, helperText, name, inputRef, messages }: TextFieldProps, ref: Ref<unknown | undefined>) => {
  const [message, setMessage] = useState<string | undefined>(messages?.off);

  const handleCheck = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
    setMessage(checked ? messages?.on : messages?.off);
  };

  return (
    <FormControl fullWidth>
      <FormGroup ref={ref}>
        <FormControlLabel label={label} onChange={handleCheck} control={<SwitchDS name={name} inputRef={inputRef} />} />
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {message && (
        <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </FormControl>
  );
};

export default forwardRef(Switch);
