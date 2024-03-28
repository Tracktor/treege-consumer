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
  readOnly?: boolean;
  value?: unknown;
}

const TimeRange = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [fromTime, setFromTime] = useState<string>(value?.[0] || "");
  const [toTime, setToTime] = useState<string>(value?.[1] || "");

  // TODO can be refacto remove state
  const handleChange = useCallback(
    (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;

      if (field === "start") {
        setFromTime(target.value);
      }

      if (field === "end") {
        setToTime(target.value);
      }

      onChange?.({
        event,
        name,
        value: field === "start" ? [target.value, toTime] : [fromTime, target.value],
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
