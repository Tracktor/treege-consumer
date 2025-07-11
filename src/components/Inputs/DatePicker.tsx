import { DatePicker as DatePickerMui } from "@mui/x-date-pickers";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/models";
import { DatePicker as DatePickerPro } from "@mui/x-date-pickers-pro";
import { Stack } from "@tracktor/design-system";
import { isString } from "@tracktor/react-utils";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, Ref, useEffect, useRef } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";

export interface DatePickerProps {
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
  licenseMuiX?: string;
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
    licenseMuiX,
  }: DatePickerProps,
  ref: Ref<HTMLDivElement>,
) => {
  const previousAncestorRef = useRef<string | undefined>(undefined);
  const ancestorValueString = isString(ancestorValue) ? ancestorValue : undefined;
  const rawValue = value || ancestorValueString;
  const formattedValue = rawValue ? dayjs(String(rawValue), FORMAT) : null;
  const PickerComponent = licenseMuiX ? DatePickerMui : DatePickerPro;

  const handleChange = (date: Dayjs | null, context: PickerChangeHandlerContext<unknown>) => {
    onChange?.(
      {
        name,
        value: date?.format(FORMAT),
      },
      context,
    );
  };

  // Update the ancestor value and trigger onChange only when the value actually changes
  useEffect(() => {
    // Check if there's a new ancestor value and it's different from the previously stored one
    if (ancestorValueString && previousAncestorRef.current !== ancestorValueString) {
      // Format the new value using dayjs and call the onChange handler
      onChange?.(
        {
          name,
          value: dayjs(String(ancestorValueString), FORMAT).format(FORMAT), // Ensures consistent date formatting
        },
        // Provide a clean validation state with the update
        { validationError: null },
      );

      // Update the ref to keep track of the current ancestor value and prevent redundant updates
      previousAncestorRef.current = ancestorValueString;
    }
  }, [ancestorValueString, name, onChange]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <PickerComponent
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
