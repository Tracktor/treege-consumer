import { DatePicker as DatePickerMui } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Box, Stack } from "@tracktor/design-system";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref, useContext } from "react";
import { OptionsContext } from "@/context/OptionsContext";
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
  const { licenseMuiX } = useContext(OptionsContext);
  const fromDate = Array?.isArray(value) && value?.[0] ? dayjs(String(value?.[0]), FORMAT) : null;
  const toDate = Array?.isArray(value) && value?.[1] ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChangeDatePicker = (field: "start" | "end") => (date: Dayjs | null) => {
    const currentDate = date?.format(FORMAT);

    onChange?.({
      name,
      value: field === "start" ? [currentDate, toDate?.format(FORMAT)] : [fromDate?.format(FORMAT), currentDate],
    });
  };

  const handleChangeDateRangePicker = (date: [Dayjs, Dayjs] | [Dayjs, null] | [null, Dayjs] | [null, null]) => {
    onChange?.({
      name,
      value: [date[0]?.format(FORMAT), date[1]?.format(FORMAT)],
    });
  };

  const disableDateBeforeStart = (date: any) => (fromDate ? date < fromDate : false);

  if (isIgnored) {
    return null;
  }

  if (licenseMuiX) {
    return (
      <DateRangePicker
        disablePast
        label={label}
        readOnly={readOnly}
        ref={ref}
        name={`${name}[]`}
        value={[fromDate, toDate]}
        onChange={handleChangeDateRangePicker}
        format="ll"
        localeText={{
          end: label,
          start: label,
        }}
      />
    );
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
        onChange={handleChangeDatePicker("start")}
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
        onChange={handleChangeDatePicker("end")}
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
