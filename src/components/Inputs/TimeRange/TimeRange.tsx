import { Box, Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface TimeRangeProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  readOnly?: boolean;
  value?: unknown;
}

const TimeRange = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = useCallback(
    (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;

      if (Array?.isArray(value)) {
        onChange?.({
          event,
          name,
          value: field === "start" ? [target.value, value?.[1]] : [value?.[0], target.value],
        });
      }
    },
    [name, onChange, value],
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        label={label}
        type="time"
        value={Array?.isArray(value) ? value?.[0] : ""}
        helperText={helperText}
        onChange={handleChange("start")}
        required={required}
        inputRef={inputRef}
        InputProps={{
          readOnly,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>→</Box>
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        value={Array?.isArray(value) ? value?.[1] : ""}
        type="time"
        helperText={helperText}
        onChange={handleChange("end")}
        required={required}
        inputRef={inputRef}
        InputProps={{
          readOnly,
        }}
      />
    </Stack>
  );
};

export default forwardRef(TimeRange);
