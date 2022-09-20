import { Alert, Checkbox as CheckboxDS, FormControl, FormControlLabel, FormGroup, FormHelperText } from "design-system-tracktor";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";

export interface TextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
  messages?: { on: string; off: string };
}

const Checkbox = ({ label, name, helperText, inputRef, messages }: TextFieldProps, ref: Ref<unknown | undefined>) => {
  const [message, setMessage] = useState<string | undefined>(messages?.off);

  const handleCheck = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
    setMessage(checked ? messages?.on : messages?.off);
  };

  return (
    <FormControl fullWidth>
      <FormGroup ref={ref}>
        <FormControlLabel label={label} onChange={handleCheck} control={<CheckboxDS name={name} inputRef={inputRef} />} />
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
export default forwardRef(Checkbox);
