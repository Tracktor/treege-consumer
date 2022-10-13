import { TextField as TextFieldDS } from "design-system-tracktor";
import { ChangeEvent, forwardRef, Ref } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";

export interface TextFieldProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  type: string;
}

const TextField = ({ label, name, helperText, inputRef, onChange, required, type }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;

    onChange?.({ event, name, type, value });
  };

  return (
    <TextFieldDS
      ref={ref}
      name={name}
      label={label}
      type={type}
      helperText={helperText}
      onChange={handleChange}
      required={required}
      inputRef={inputRef}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default forwardRef(TextField);
