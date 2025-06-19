import type { PickerChangeHandlerContext } from "@mui/x-date-pickers/models";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import { isString } from "@tracktor/react-utils";
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
  pattern?: string;
  patternMessage?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField, context: PickerChangeHandlerContext<unknown>): void;
  ancestorValue?: unknown;
}

const FORMAT = "YYYY-MM-DD";

const DatePicker = (
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
    error,
    pattern,
    patternMessage,
    ancestorValue,
  }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const previousAncestorRef = useRef<string | undefined>();
  const ancestorValueString = isString(ancestorValue) ? ancestorValue : undefined;
  const rawValue = value || ancestorValueString;
  const formattedValue = rawValue ? dayjs(String(rawValue), FORMAT) : null;

  const handleChange = (date: Dayjs | null, context: PickerChangeHandlerContext<unknown>) => {
    onChange?.(
      {
        name,
        value: date?.format(FORMAT),
      },
      context,
    );
  };

  // Update the ancestor value to trigger onChange only when it changes
  useEffect(() => {
    if (ancestorValueString && previousAncestorRef.current !== ancestorValueString) {
      onChange?.(
        {
          name,
          value: dayjs(String(ancestorValueString), FORMAT).format(FORMAT),
        },
        { validationError: null },
      );

      previousAncestorRef.current = ancestorValueString;
    }
  }, [ancestorValueString, name, onChange]);

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
        value={formattedValue}
        onChange={handleChange}
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
  );
};

export default forwardRef(DatePicker);
