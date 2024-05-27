import { DatePicker as DatePickerMui } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface DateRangeProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  value?: unknown;
  readOnly?: boolean;
  isIgnored?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const FORMAT = "YYYY-MM-DD";

const DatePicker = (
  { label, name, helperText, inputRef, onChange, required, value, readOnly, isIgnored }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = (date: Dayjs | null) => {
    onChange?.({
      name,
      value: date?.format(FORMAT),
    });
  };

  if (isIgnored) {
    return null;
  }

  return (
    <DatePickerMui
      disablePast
      label={label}
      readOnly={readOnly}
      ref={ref}
      value={value ? dayjs(String(value), FORMAT) : null}
      onChange={handleChange}
      format="ll"
      slotProps={{
        textField: () => ({
          fullWidth: true,
          helperText,
          inputRef,
          required,
        }),
      }}
    />
  );
};

export default forwardRef(DatePicker);
