import { PickerChangeHandlerContext, TimePicker as TimePickerMui } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import { isString } from "@tracktor/react-utils";
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
  ancestorValue?: unknown;
}

const FORMAT = "HH:mm";

const parseTimeRange = (value?: unknown, fallback?: unknown): [Dayjs | null, Dayjs | null] => {
  const parse = (val: unknown): Dayjs | null => {
    if (!isString(val) || val.trim() === "") return null;

    const parsed = dayjs(val, FORMAT);
    return parsed.isValid() ? parsed : null;
  };

  if (Array.isArray(value) && (value[0] || value[1])) {
    return [parse(value[0]), parse(value[1])];
  }

  if (Array.isArray(fallback) && (fallback[0] || fallback[1])) {
    return [parse(fallback[0]), parse(fallback[1])];
  }

  if (isString(fallback) && fallback.includes(" - ")) {
    const [startStr, endStr] = fallback.split(" - ");
    return [parse(startStr), parse(endStr)];
  }

  return [null, null];
};

const TimeRange = (
  {
    label,
    name,
    helperText,
    inputRef,
    onChange,
    required,
    readOnly,
    value,
    isIgnored,
    pattern,
    patternMessage,
    error,
    ancestorValue,
  }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [startTime, endTime] = parseTimeRange(value, ancestorValue);

  const handleChange = (field: "start" | "end") => (time: Dayjs | null, context: PickerChangeHandlerContext<unknown>) => {
    const formattedTime = time?.format(FORMAT);
    onChange?.(
      {
        name,
        value: field === "start" ? [formattedTime, endTime?.format(FORMAT)] : [startTime?.format(FORMAT), formattedTime],
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
          value={startTime}
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
          value={endTime}
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
