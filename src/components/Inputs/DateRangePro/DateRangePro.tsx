import { DateRangePicker } from "@mui/x-date-pickers-pro";
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

const DateRangePro = (
  { label, name, helperText, inputRef, onChange, required, value, readOnly, isIgnored }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const fromDate = Array?.isArray(value) && value?.[0] ? dayjs(String(value?.[0]), FORMAT) : null;
  const toDate = Array?.isArray(value) && value?.[1] ? dayjs(String(value?.[1]), FORMAT) : null;

  const handleChangeDateRangePicker = (date: [Dayjs, Dayjs] | [Dayjs, null] | [null, Dayjs] | [null, null]) => {
    onChange?.({
      name,
      value: [date[0]?.format(FORMAT), date[1]?.format(FORMAT)],
    });
  };

  if (isIgnored) {
    return null;
  }

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

export default forwardRef(DateRangePro);
