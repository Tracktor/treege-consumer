import type { PickerChangeHandlerContext } from "@mui/x-date-pickers/models";
import { DatePicker as DatePickerMui, DateRangePicker } from "@mui/x-date-pickers-pro";
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
  licenseMuiX?: string;
  pattern?: string;
  patternMessage?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField, context: PickerChangeHandlerContext<unknown>): void;
}

const FORMAT = "YYYY-MM-DD";

const DateRange = (
  {
    label,
    name,
    helperText,
    inputRef,
    onChange,
    required,
    value,
    readOnly,
    isIgnored,
    disablePast,
    licenseMuiX,
    pattern,
    patternMessage,
    error,
  }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const fromDate = Array?.isArray(value) && value?.[0] ? dayjs(String(value?.[0]), FORMAT) : null;
  const toDate = Array?.isArray(value) && value?.[1] ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChangeDatePicker = (field: "start" | "end") => (date: Dayjs | null, context: PickerChangeHandlerContext<unknown>) => {
    const currentDate = date?.format(FORMAT);

    onChange?.(
      {
        name,
        value: field === "start" ? [currentDate, toDate?.format(FORMAT)] : [fromDate?.format(FORMAT), currentDate],
      },
      context,
    );
  };

  const handleChangeDateRangePickerPro = (
    date: [Dayjs, Dayjs] | [Dayjs, null] | [null, Dayjs] | [null, null],
    context: PickerChangeHandlerContext<unknown>,
  ) => {
    onChange?.(
      {
        name,
        value: [date[0]?.format(FORMAT), date[1]?.format(FORMAT)],
      },
      context,
    );
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
        <InputLabel required={required}>{label}</InputLabel>
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
              error,
              fullWidth: true,
              helperText,
              inputRef,
              name: `${name}[]`,
              pattern,
              required,
              title: patternMessage,
            }),
          }}
        />
      </Stack>
    );
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
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

export default forwardRef(DateRange);
