import { TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface TextFieldProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  type: string;
  readOnly?: boolean;
  multiple?: boolean;
  shrink?: boolean;
  value?: unknown;
  isIgnored?: boolean;
}

const TextField = (
  { label, name, helperText, inputRef, onChange, required, type, readOnly, multiple, shrink, value, isIgnored }: TextFieldProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    onChange?.({ event, name, type, value: target.value });
  };

  if (isIgnored) {
    return null;
  }

  return (
    <TextFieldDS
      fullWidth
      disabled={type === "file" && readOnly}
      ref={ref}
      name={name}
      label={label}
      type={type}
      helperText={helperText}
      onChange={handleChange}
      required={required}
      value={value}
      inputRef={inputRef}
      inputProps={{
        multiple,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        readOnly,
      }}
      InputLabelProps={{
        shrink,
      }}
    />
  );
};

export default forwardRef(TextField);
