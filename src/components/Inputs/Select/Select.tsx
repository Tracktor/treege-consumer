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
import { forwardRef, Ref, useEffect, useState } from "react";
import useInputs from "@/hooks/useInputs";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface SelectProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  readOnly?: boolean;
  handleFormValue?(dataAttribute: ChangeEventField): void;
  value?: string;
}

const Select = ({ data, helperText, inputRef, required, handleFormValue, readOnly, value }: SelectProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { children, attributes } = data;
  const { label, values, type, isLeaf, isDecision, name } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });

  const handleChange = (event: SelectChangeEvent) => {
    const { target } = event;
    const messageValue = getMessageByValue({ options, value: target.value });

    handleFormValue?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value: target.value });
    setMessage(messageValue);
  };

  // Re-create tree
  useEffect(
    () => {
      if (isDecision) {
        handleFormValue?.({ children, isDecision, isLeaf, name, type, value });
      }
    },
    // Only on mount
    // eslint-disable-next-line
    []);

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <SelectDS
        fullWidth
        value={value || ""}
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
