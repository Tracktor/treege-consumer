import { TextField as TextFieldDS, Box, FormLabel } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback, useEffect, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";

export interface DateRangeProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
  onChange?(dataAttribute: ChangeEventField): void;
  required?: boolean;
  defaultValue?: unknown;
  type: string;
  readOnly?: boolean;
}

const DateRange = (
  { label, name, helperText, inputRef, onChange, required, type, defaultValue, readOnly }: DateRangeProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChange = useCallback(
    (field: "start" | "end") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      if (field === "start") {
        setFromDate(value);
      }
      if (field === "end") {
        setToDate(value);
      }

      onChange?.({ event, name, type, value });
    },
    [name, onChange, type],
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
    <Box alignItems="center" justifyContent="center" height="100%" display="flex">
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <TextFieldDS
        ref={ref}
        name={name}
        label="start"
        type="date"
        helperText={helperText}
        onChange={handleChange("start")}
        required={required}
        inputRef={inputRef}
        InputProps={{
          readOnly,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        error={error}
      />
      <TextFieldDS
        ref={ref}
        name={name}
        label="end"
        type="date"
        helperText={helperText}
        onChange={handleChange("end")}
        required={required}
        defaultValue={defaultValue}
        inputRef={inputRef}
        InputProps={{
          readOnly,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        error={error}
      />
    </Box>
  );
};

export default forwardRef(DateRange);
