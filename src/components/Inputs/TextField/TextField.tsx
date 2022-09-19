import { TextField as TextFieldDS } from "design-system-tracktor";
import { ChangeEvent, forwardRef, Ref } from "react";

export interface TextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
  onChange?(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  required?: boolean;
  type: string;
}

const TextField = ({ label, name, helperText, inputRef, onChange, required, type }: TextFieldProps, ref: Ref<HTMLDivElement>) => (
  <TextFieldDS
    ref={ref}
    name={name}
    label={label}
    type={type}
    helperText={helperText}
    onChange={onChange}
    required={required}
    inputRef={inputRef}
    InputLabelProps={{
      shrink: true,
    }}
  />
);

export default forwardRef(TextField);
