import { DatePicker as DatePickerMui } from "@mui/x-date-pickers";
import { Box, Stack } from "@tracktor/design-system";
import dayjs from "dayjs";
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

const DateRange = (
  { label, name, helperText, inputRef, onChange, required, value, readOnly, isIgnored }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const fromDate = Array?.isArray(value) ? dayjs(String(value?.[0]), FORMAT) : null;
  const toDate = Array?.isArray(value) ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChange = (field: "start" | "end") => (date: any) => {
    const currentDate = date?.format(FORMAT);

    onChange?.({
      name,
      value: field === "start" ? [currentDate, toDate?.format(FORMAT)] : [fromDate?.format(FORMAT), currentDate],
    });
  };

  const disableDateBeforeStart = (date: any) => (fromDate ? date < fromDate : false);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <DatePickerMui
        disablePast
        label={label}
        readOnly={readOnly}
        ref={ref}
        name={`${name}[]`}
        value={fromDate}
        onChange={handleChange("start")}
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
      <Box>→</Box>
      <DatePickerMui
        disablePast
        label={label}
        readOnly={readOnly}
        ref={ref}
        name={`${name}[]`}
        value={toDate}
        onChange={handleChange("end")}
        shouldDisableDate={disableDateBeforeStart}
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

export default forwardRef(DateRange);
