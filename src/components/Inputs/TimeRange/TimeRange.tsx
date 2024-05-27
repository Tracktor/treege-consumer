import { TimePicker as TimePickerMui } from "@mui/x-date-pickers/TimePicker/TimePicker";
import { Box, Stack } from "@tracktor/design-system";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref } from "react";
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
  isIgnored?: boolean;
}

const FORMAT = "HH:mm";

const TimeRange = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value, isIgnored }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const startValue = Array?.isArray(value) ? dayjs(String(value?.[0]), FORMAT) : null;
  const endValue = Array?.isArray(value) ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChange = (field: "start" | "end") => (time: Dayjs | null) => {
    const currentTime = time?.format(FORMAT);

    onChange?.({
      name,
      value: field === "start" ? [currentTime, endValue?.format(FORMAT)] : [startValue?.format(FORMAT), currentTime],
    });
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TimePickerMui
        label={label}
        readOnly={readOnly}
        ampm={false}
        ref={ref}
        value={startValue}
        onChange={handleChange("start")}
        format="HH:mm"
        slotProps={{
          textField: () => ({
            fullWidth: true,
            helperText,
            inputRef,
            required,
          }),
        }}
      />
      <Box>→</Box>
      <TimePickerMui
        label={label}
        readOnly={readOnly}
        ampm={false}
        ref={ref}
        value={endValue}
        onChange={handleChange("end")}
        format="HH:mm"
        slotProps={{
          textField: () => ({
            fullWidth: true,
            helperText,
            inputRef,
            required,
          }),
        }}
      />
    </Stack>
  );
};

export default forwardRef(TimeRange);
