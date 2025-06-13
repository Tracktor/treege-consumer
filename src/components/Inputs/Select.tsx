import { Alert, FormControl, FormHelperText, MenuItem, Select as SelectDS, SelectChangeEvent, Stack } from "@tracktor/design-system";
import { isString } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { forwardRef, Ref, useEffect, useRef, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import useInputs from "@/hooks/useInputs";
import ChangeEventField from "@/types/ChangeEventField";

export interface SelectProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  onInit?(dataAttribute: ChangeEventField): void;
  value?: unknown;
  isIgnored?: boolean;
  error?: boolean;
}

const Select = (
  { data, helperText, inputRef, required, onChange, onInit, readOnly, isIgnored, error, value = "" }: SelectProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { children, attributes } = data;
  const { label, values, type, isLeaf, isDecision, name } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });
  const onInitRef = useRef(onInit);

  const handleChange = (event: SelectChangeEvent) => {
    const { target } = event;
    const messageValue = getMessageByValue({ options, value: target.value });

    onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value: target.value });
    setMessage(messageValue);
  };

  // Trigger the onInit when the component is mounted
  useEffect(() => {
    if (isDecision && value) {
      onInitRef.current?.({ children, isDecision, isLeaf, name, type, value });
    }
  }, [children, isDecision, isLeaf, name, type, value]);

  // Update the onInitRef when the onInit changes
  useEffect(() => {
    onInitRef.current = onInit;
  }, [onInit]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl required={required} ref={ref} fullWidth>
        <SelectDS
          fullWidth
          required={required}
          error={error}
          value={isString(value) ? value : ""}
          labelId={`${name}-label`}
          id={name}
          name={name}
          onChange={handleChange}
          inputRef={inputRef}
          readOnly={readOnly}
        >
          {options?.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectDS>
        {helperText && <FormHelperText sx={{ ...(error && { color: "error.main" }) }}>{helperText}</FormHelperText>}
        {message && (
          <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
            {message}
          </Alert>
        )}
      </FormControl>
    </Stack>
  );
};
export default forwardRef(Select);
