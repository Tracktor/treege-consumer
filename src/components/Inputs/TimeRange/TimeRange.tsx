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
  onChange?(dataAttribute: ChangeEventField): void;
}

const FORMAT = "HH:mm";

const TimeRange = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value, isIgnored }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const startValue = Array?.isArray(value) && value?.[0] ? dayjs(String(value?.[0]), FORMAT) : null;
  const endValue = Array?.isArray(value) && value?.[1] ? dayjs(String(value?.[1]), FORMAT) : null;

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
              fullWidth: true,
              helperText,
              inputRef,
              required,
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
              fullWidth: true,
              helperText,
              inputRef,
              required,
            }),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default forwardRef(TimeRange);
