import { DatePicker as DatePickerMui, DateRangePicker } from "@mui/x-date-pickers-pro";
import { InputLabel, Stack, Typography } from "@tracktor/design-system";
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
  disablePast?: boolean;
  licenseMuiX?: string;
  onChange?(dataAttribute: ChangeEventField): void;
}

const FORMAT = "YYYY-MM-DD";

const DateRange = (
  { label, name, helperText, inputRef, onChange, required, value, readOnly, isIgnored, disablePast, licenseMuiX }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const fromDate = Array?.isArray(value) && value?.[0] ? dayjs(String(value?.[0]), FORMAT) : null;
  const toDate = Array?.isArray(value) && value?.[1] ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChangeDatePicker = (field: "start" | "end") => (date: Dayjs | null) => {
    const currentDate = date?.format(FORMAT);

    onChange?.({
      name,
      value: field === "start" ? [currentDate, toDate?.format(FORMAT)] : [fromDate?.format(FORMAT), currentDate],
    });
  };

  const handleChangeDateRangePickerPro = (date: [Dayjs, Dayjs] | [Dayjs, null] | [null, Dayjs] | [null, null]) => {
    onChange?.({
      name,
      value: [date[0]?.format(FORMAT), date[1]?.format(FORMAT)],
    });
  };

  if (isIgnored) {
    return null;
  }

  const disableDateBeforeStart = (date: any) => (fromDate ? date < fromDate : false);

  if (isIgnored) {
    return null;
  }

  if (licenseMuiX) {
    return (
      <Stack spacing={1.5}>
        <Typography variant="h5">{label}</Typography>
        <DateRangePicker
          disablePast={disablePast}
          readOnly={readOnly}
          ref={ref}
          name={`${name}[]`}
          value={[fromDate, toDate]}
          onChange={handleChangeDateRangePickerPro}
          format="ll"
          localeText={{
            end: "Fin",
            start: "Début",
          }}
          slotProps={{
            textField: () => ({
              fullWidth: true,
              helperText,
              inputRef,
              name: `${name}[]`,
              required,
            }),
          }}
        />
      </Stack>
    );
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="h5" component={InputLabel} required={required} color="text.primary">
        {label}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <DatePickerMui
          disablePast={disablePast}
          label="Début"
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
        <DatePickerMui
          disablePast={disablePast}
          label="Fin"
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
    </Stack>
  );
};

export default forwardRef(DateRange);
