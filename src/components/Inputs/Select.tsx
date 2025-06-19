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
  ancestorValue?: unknown;
}

const Select = (
  { data, helperText, inputRef, required, onChange, onInit, readOnly, isIgnored, error, ancestorValue, value = "" }: SelectProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { children, attributes } = data;
  const { label, values, type, isLeaf, isDecision, name } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });
  const onInitRef = useRef(onInit);
  const ancestorRef = useRef<string>();
  const stringAncestor = isString(ancestorValue) ? ancestorValue : undefined;

  const validOptionValues = options.map((opt) => String(opt.value));
  const selectedValue = isString(value) && validOptionValues.includes(value) ? value : "";

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

  // Sync the ancestor value with the onChange handler
  useEffect(() => {
    // Helper function to determine what value should be selected automatically
    const getSelectedValue = (): string | undefined => {
      const optionValues = options.map((opt) => String(opt.value)); // Normalize all option values to strings

      // Case 1: If there's a stringAncestor that differs from the current ref and it's a valid option
      if (stringAncestor && stringAncestor !== ancestorRef.current && optionValues.includes(stringAncestor)) {
        ancestorRef.current = stringAncestor; // Update the ref to avoid repeated triggering
        return stringAncestor; // Use stringAncestor as the selected value
      }

      // Case 2: If no value is selected, there's exactly one child, it's required, and the first option is valid
      if (!value && children.length === 1 && required && optionValues.includes(String(options[0]?.value))) {
        return String(options[0]?.value); // Use the first option as the selected value
      }

      return undefined;
    };

    const selectValue = getSelectedValue();

    if (selectValue) {
      // Get message associated with the selected value
      const messageValue = getMessageByValue({ options, value: selectValue });

      // Trigger the onChange handler with the new value and context
      onChange?.({
        children,
        hasMessage: !!messageValue,
        isDecision,
        isLeaf,
        name,
        type,
        value: selectValue,
      });

      setMessage(messageValue);
    }

    // Dependencies: triggers when any of these values change
  }, [children, getMessageByValue, isDecision, isLeaf, name, onChange, options, required, stringAncestor, type, value, ancestorValue]);

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
          value={selectedValue}
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
