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
import { forwardRef, Ref, useCallback, useState } from "react";
import useInputs from "@/hooks/useInputs";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface SelectProps<T = unknown> {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  defaultValue?: T;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const Select = ({ data, helperText, inputRef, required, onChange, readOnly, defaultValue = "" }: SelectProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { name, children, attributes } = data;
  const { label, values, type, isLeaf, isDecision } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const { value } = event.target;
      const messageValue = getMessageByValue({ options, value });

      onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value });
      setMessage(messageValue);
    },
    [children, getMessageByValue, isDecision, isLeaf, name, onChange, options, type],
  );

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <SelectDS
        fullWidth
        defaultValue={String(defaultValue)}
        labelId={`${name}-label`}
        id={name}
        label={label}
        name={name}
        onChange={handleChange}
        inputRef={inputRef}
        readOnly={readOnly}
        input={<OutlinedInput notched label={label} />}
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
