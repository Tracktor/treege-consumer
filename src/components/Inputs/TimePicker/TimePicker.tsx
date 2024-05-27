import { TimePicker as TimePickerMui } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref } from "react";
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

const TimePicker = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value, isIgnored }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = (time: Dayjs | null) => {
    onChange?.({
      name,
      value: time?.format("HH:mm"),
    });
  };

  if (isIgnored) {
    return null;
  }

  return (
    <TimePickerMui
      label={label}
      readOnly={readOnly}
      ampm={false}
      ref={ref}
      value={value ? dayjs(String(value), "HH:mm") : null}
      onChange={handleChange}
      format="HH:mm"
      slotProps={{
        textField: () => ({
          helperText,
          inputRef,
          required,
        }),
      }}
    />
  );
};

export default forwardRef(TimePicker);
