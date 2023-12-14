import { TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";

export interface TextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  defaultValue?: unknown;
  type: string;
  readOnly?: boolean;
}

const TextField = (
  { label, name, helperText, inputRef, onChange, required, type, defaultValue, readOnly }: TextFieldProps,
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
      InputProps={{
        readOnly,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default forwardRef(TextField);
