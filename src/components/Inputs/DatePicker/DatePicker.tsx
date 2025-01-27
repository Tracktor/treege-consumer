import { DatePicker as DatePickerMui } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
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
  disablePast?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const FORMAT = "YYYY-MM-DD";

const DatePicker = (
  { label, name, helperText, inputRef, onChange, required, value, readOnly, isIgnored, disablePast }: DateRangeProps,
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
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <DatePickerMui
        disablePast={disablePast}
        readOnly={readOnly}
        ref={ref}
        name={name}
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
    </Stack>
  );
};

export default forwardRef(DatePicker);
