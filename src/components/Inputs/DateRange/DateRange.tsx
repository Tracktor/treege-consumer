import { Box, Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useEffect, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface DateRangeProps {
  label?: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  value?: unknown;
  readOnly?: boolean;
}

const DateRange = (
  { label, name, helperText, inputRef, onChange, required, value, readOnly }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [error, setError] = useState<boolean>(false);
  const fromDate = Array?.isArray(value) ? value?.[0] : "";
  const toDate = Array?.isArray(value) ? value?.[1] : "";

  const handleChange = (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    onChange?.({
      event,
      name,
      value: field === "start" ? [target.value, toDate] : [fromDate, target.value],
    });
  };

  useEffect(() => {
    if (fromDate?.length > 0 && toDate.length > 0) {
      if (new Date(fromDate) > new Date(toDate)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [fromDate, toDate]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        label={label}
        type="date"
        helperText={helperText}
        onChange={handleChange("start")}
        required={required}
        inputRef={inputRef}
        value={fromDate}
        error={error}
        InputProps={{
          readOnly,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>→</Box>
      <TextFieldDS
        fullWidth
        ref={ref}
        name={name}
        type="date"
        helperText={helperText}
        onChange={handleChange("end")}
        required={required}
        value={toDate}
        inputRef={inputRef}
        error={error}
        InputProps={{
          readOnly,
        }}
      />
    </Stack>
  );
};

export default forwardRef(DateRange);
