import type { PickerChangeHandlerContext } from "@mui/x-date-pickers/models";
import { TimePicker as TimePickerMui } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
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
  pattern?: string;
  patternMessage?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField, context: PickerChangeHandlerContext<unknown>): void;
}

const FORMAT = "HH:mm";

const TimePicker = (
  { label, name, helperText, inputRef, onChange, required, readOnly, value, isIgnored, pattern, patternMessage, error }: TimeRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const handleChange = (time: Dayjs | null, context: PickerChangeHandlerContext<unknown>) => {
    onChange?.(
      {
        name,
        value: time?.format(FORMAT),
      },
      context,
    );
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <TimePickerMui
        ampm={false}
        name={name}
        readOnly={readOnly}
        ref={ref}
        value={value ? dayjs(String(value), FORMAT) : null}
        onChange={handleChange}
        format={FORMAT}
        slotProps={{
          textField: () => ({
            error,
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

export default forwardRef(TimePicker);
