import { TimePicker as TimePickerMui } from "@mui/x-date-pickers";
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

const FORMAT = "HH:mm";

const TimePicker = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value, isIgnored }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = (time: Dayjs | null) => {
    onChange?.({
      name,
      value: time?.format(FORMAT),
    });
  };

  if (isIgnored) {
    return null;
  }

  return (
    <TimePickerMui
      ampm={false}
      label={label}
      name={name}
      readOnly={readOnly}
      ref={ref}
      value={value ? dayjs(String(value), FORMAT) : null}
      onChange={handleChange}
      format={FORMAT}
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
