import { Box, Stack, TextField as TextFieldDS } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback, useEffect, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface DateRangeProps {
  label: string;
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
  const [fromDate, setFromDate] = useState<string>(value?.[0] || "");
  const [toDate, setToDate] = useState<string>(value?.[1] || "");
  const [error, setError] = useState<boolean>(false);

  // TODO can be refacto remove state
  const handleChange = useCallback(
    (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;

      if (field === "start") {
        setFromDate(target.value);
      }

      if (field === "end") {
        setToDate(target.value);
      }

      onChange?.({
        event,
        name,
        value: field === "start" ? [target.value, toDate] : [fromDate, target.value],
      });
    },
    [fromDate, name, onChange, toDate],
  );

  useEffect(() => {
    if (fromDate.length > 0 && toDate.length > 0) {
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
