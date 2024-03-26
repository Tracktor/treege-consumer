import { Box, Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface TimeRangeProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  defaultValue?: unknown;
  readOnly?: boolean;
}

const TimeRange = (
  { label, name, helperText, inputRef, onChange, required, defaultValue, readOnly }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");

  const handleChange = useCallback(
    (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      if (field === "start") {
        setFromTime(value);
      }

      if (field === "end") {
        setToTime(value);
      }

      onChange?.({
        event,
        name,
        value: field === "start" ? [value, toTime] : [fromTime, value],
      });
    },
    [fromTime, name, onChange, toTime],
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        label={label}
        type="time"
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
        type="time"
        helperText={helperText}
        onChange={handleChange("end")}
        required={required}
        defaultValue={defaultValue}
        inputRef={inputRef}
        InputProps={{
          readOnly,
        }}
      />
    </Stack>
  );
};

export default forwardRef(TimeRange);
