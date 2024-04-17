import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as SelectDS,
  SelectChangeEvent,
} from "@tracktor/design-system";
import { isString } from "@tracktor/react-utils";
import { forwardRef, Ref, useEffect, useRef, useState } from "react";
import useInputs from "@/hooks/useInputs";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface SelectProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  onInit?(dataAttribute: ChangeEventField): void;
  value?: unknown;
}

const Select = (
  { data, helperText, inputRef, required, onChange, onInit, readOnly, value = "" }: SelectProps,
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

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <SelectDS
        fullWidth
        value={isString(value) ? value : ""}
        labelId={`${name}-label`}
        id={name}
        label={label}
        name={name}
        onChange={handleChange}
        inputRef={inputRef}
        readOnly={readOnly}
        input={<OutlinedInput label={label} />}
      >
        {options?.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectDS>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {message && (
        <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </FormControl>
  );
};
export default forwardRef(Select);
