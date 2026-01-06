import { DatePicker, DateRangePicker, PickerChangeHandlerContext } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref, useEffect, useRef } from "react";
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
  ancestorValue?: unknown;
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
    ancestorValue,
  }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const previousAncestorRef = useRef<string[] | undefined>(undefined);
  const ancestorValueArray = Array.isArray(ancestorValue) ? ancestorValue : undefined;
  const rawValue = value || ancestorValueArray;
  const fromDate = Array.isArray(rawValue) && rawValue[0] ? dayjs(String(rawValue[0]), FORMAT) : null;
  const toDate = Array.isArray(rawValue) && rawValue[1] ? dayjs(String(rawValue[1]), FORMAT) : null;

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

  const disableDateBeforeStart = (date: any) => (fromDate ? date < fromDate : false);

  // If ancestorValue is provided, we update the ancestor value when the component mounts or when ancestorValueArray changes
  useEffect(() => {
    if (Array.isArray(ancestorValueArray)) {
      const ancestorDates: string[] = ancestorValueArray.map((val) => (val ? dayjs(String(val), FORMAT).format(FORMAT) : ""));

      if (JSON.stringify(previousAncestorRef.current) !== JSON.stringify(ancestorDates)) {
        onChange?.(
          {
            name,
            value: ancestorDates,
          },
          { validationError: null },
        );

        previousAncestorRef.current = ancestorDates;
      }
    }
  }, [ancestorValueArray, name, onChange]);

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
        <DatePicker
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
        <DatePicker
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
