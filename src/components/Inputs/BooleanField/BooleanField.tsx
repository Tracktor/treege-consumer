import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from "design-system-tracktor";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";

export interface BooleanFieldProps {
  type: "checkbox" | "switch";
  label: string;
  helperText?: string;
  name: string;
  inputRef: Ref<any>;
  messages?: { on?: string; off?: string };
}

const BooleanField = ({ type, label, inputRef, name, helperText, messages }: BooleanFieldProps, ref: Ref<unknown | undefined>) => {
  const Field = type === "checkbox" ? Checkbox : Switch;
  const [message, setMessage] = useState<string | undefined>(messages?.off);

  const handleCheck = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
    setMessage(checked ? messages?.on : messages?.off);
  };

  return (
    <FormControl fullWidth>
      <FormGroup ref={ref}>
        <FormControlLabel label={label} onChange={handleCheck} control={<Field name={name} inputRef={inputRef} />} />
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

export default forwardRef(BooleanField);
