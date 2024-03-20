import { TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface TextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  defaultValue?: unknown;
  type: string;
  readOnly?: boolean;
  multiple?: boolean;
}

const TextField = (
  { label, name, helperText, inputRef, onChange, required, type, defaultValue, readOnly, multiple }: TextFieldProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      onChange?.({ event, name, type, value });
    },
    [name, onChange, type],
  );

  return (
    <TextFieldDS
      ref={ref}
      name={name}
      label={label}
      type={type}
      helperText={helperText}
      onChange={handleChange}
      required={required}
      defaultValue={defaultValue}
      inputRef={inputRef}
      inputProps={{
        multiple,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        readOnly,
      }}
    />
  );
};

export default forwardRef(TextField);
