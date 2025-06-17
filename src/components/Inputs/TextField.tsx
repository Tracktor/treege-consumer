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
    type,
    readOnly,
    multiple,
    shrink,
    value,
    isIgnored,
    pattern,
    patternMessage,
    error,
    ancestorValue,
  }: TextFieldProps,
  ref: Ref<HTMLDivElement>,
) => {
  const prevAncestorValue = useRef(ancestorValue);
  const [text, setText] = useState(() => (ancestorValue || value) ?? "");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value: newValue } = event.target;
    setText(newValue);
    onChange?.({ event, name, type, value: newValue });
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === "number") {
      const handleWheel = (e: Event) => e.preventDefault();

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

  useEffect(() => {
    if (ancestorValue !== prevAncestorValue.current && ancestorValue !== text) {
      setText(ancestorValue ?? "");
      onChange?.({ event: undefined, name, type, value: ancestorValue });
      prevAncestorValue.current = ancestorValue;
    }
  }, [ancestorValue, name, type, text, onChange]);

  if (isIgnored) return null;

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
        value={text}
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
