import { Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, FocusEvent, forwardRef, Ref } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
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

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Disable wheel on number input, because this change the value
    if (type === "number") {
      const handleWheel = (e: Event) => {
        e.preventDefault();
      };

      event.target.addEventListener("wheel", handleWheel, { passive: false });

      event.target.addEventListener(
        "blur",
        () => {
          event.target.removeEventListener("wheel", handleWheel);
        },
        { once: true },
      );
    }
  };

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <TextFieldDS
        fullWidth
        onChange={handleChange}
        onFocus={handleFocus}
        ref={ref}
        name={name}
        type={type}
        helperText={helperText}
        required={required}
        value={value}
        inputRef={inputRef}
        slotProps={{
          htmlInput: {
            multiple,
          },
          input: {
            readOnly,
          },
          inputLabel: {
            shrink,
          },
        }}
      />
    </Stack>
  );
};

export default forwardRef(TextField);
