import { Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, FocusEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";

export interface TextFieldProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<HTMLInputElement>;
  required?: boolean;
  type: string;
  readOnly?: boolean;
  multiple?: boolean;
  shrink?: boolean;
  value?: unknown;
  isIgnored?: boolean;
  pattern?: string;
  patternMessage?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  ancestorValue?: unknown;
}

const TextField = (
  {
    label,
    name,
    helperText,
    inputRef,
    onChange,
    required,
    type = "text",
    readOnly,
    multiple,
    shrink,
    value = "",
    ancestorValue,
    error,
    pattern,
    isIgnored,
    patternMessage,
  }: TextFieldProps,
  ref: Ref<HTMLDivElement>,
) => {
  const stringAncestorValue = typeof ancestorValue === "string" ? ancestorValue : undefined;
  const lastAncestorValueRef = useRef<string | undefined>(stringAncestorValue);
  const [text, setText] = useState(() => stringAncestorValue || value || "");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    onChange?.({ event, name, type, value: newValue });
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === "number") {
      const preventWheel = (e: Event) => e.preventDefault();
      event.target.addEventListener("wheel", preventWheel, { passive: false });
      event.target.addEventListener(
        "blur",
        () => {
          event.target.removeEventListener("wheel", preventWheel);
        },
        { once: true },
      );
    }
  };

  // Update the text state when ancestorValue changes
  useEffect(() => {
    const ancestorAsString = typeof ancestorValue === "string" ? ancestorValue : "";

    if (ancestorAsString !== lastAncestorValueRef.current) {
      lastAncestorValueRef.current = ancestorAsString;
      setText(ancestorAsString);
      onChange?.({ event: undefined, name, type, value: ancestorAsString });
    }
  }, [ancestorValue, name, type, onChange]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        type={type}
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
        helperText={helperText}
        required={required}
        inputRef={inputRef}
        error={error}
        slotProps={{
          htmlInput: {
            multiple,
            pattern,
            title: patternMessage,
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
