import { Box, Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface TimeRangeProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  handleFormValue?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  readOnly?: boolean;
  value?: unknown;
}

const TimeRange = (
  { label, name, helperText, inputRef, handleFormValue, required, readOnly, value }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const toTime = Array?.isArray(value) ? value?.[1] : "";
  const fromTime = Array?.isArray(value) ? value?.[0] : "";

  const handleChange = (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    handleFormValue?.({
      event,
      name,
      value: field === "start" ? [target.value, toTime] : [fromTime, target.value],
    });
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        label={label}
        type="time"
        value={fromTime}
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
        value={toTime}
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
