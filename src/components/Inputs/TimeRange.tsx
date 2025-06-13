import type { PickerChangeHandlerContext } from "@mui/x-date-pickers/models";
import { TimePicker as TimePickerMui } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";

export interface TimeRangeProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  readOnly?: boolean;
  value?: unknown;
  isIgnored?: boolean;
  pattern?: string;
  patternMessage?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField, context: PickerChangeHandlerContext<unknown>): void;
}

const FORMAT = "HH:mm";

const TimeRange = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value, isIgnored, pattern, patternMessage, error }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const startValue = Array?.isArray(value) && value?.[0] ? dayjs(String(value?.[0]), FORMAT) : null;
  const endValue = Array?.isArray(value) && value?.[1] ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChange = (field: "start" | "end") => (time: Dayjs | null, context: PickerChangeHandlerContext<unknown>) => {
    const currentTime = time?.format(FORMAT);

    onChange?.(
      {
        name,
        value: field === "start" ? [currentTime, endValue?.format(FORMAT)] : [startValue?.format(FORMAT), currentTime],
      },
      context,
    );
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <Stack direction="row" spacing={1} alignItems="center">
        <TimePickerMui
          ampm={false}
          label="Début"
          readOnly={readOnly}
          ref={ref}
          value={startValue}
          name={`${name}[]`}
          onChange={handleChange("start")}
          format={FORMAT}
          slotProps={{
            textField: () => ({
              error,
              fullWidth: true,
              helperText,
              inputRef,
              pattern,
              required,
              title: patternMessage,
            }),
          }}
        />
        <TimePickerMui
          ampm={false}
          label="Fin"
          readOnly={readOnly}
          ref={ref}
          value={endValue}
          name={`${name}[]`}
          onChange={handleChange("end")}
          format={FORMAT}
          slotProps={{
            textField: () => ({
              error,
              fullWidth: true,
              helperText,
              inputRef,
              pattern,
              required,
              title: patternMessage,
            }),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default forwardRef(TimeRange);
