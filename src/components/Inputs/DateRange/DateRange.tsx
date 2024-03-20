import { TextField as TextFieldDS, Stack, Box } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback, useEffect, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface DateRangeProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<unknown>;
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

      onChange?.({
          // children,
          event,
          name,
          type,
          value
      });
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
    <Stack direction="row" spacing={0.5} alignItems="center">
      <TextFieldDS
        ref={ref}
        name={name}
        label={label}
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
      <Box>→</Box>
      <TextFieldDS
        ref={ref}
        name={name}
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
    </Stack>
  );
};

export default forwardRef(DateRange);
