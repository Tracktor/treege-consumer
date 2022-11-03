import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as SelectDS,
  SelectChangeEvent,
} from "design-system-tracktor";
import { forwardRef, Ref, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import useInputs from "@/hooks/useInputs";
import type { TreeNode } from "@/types/TreeNode";

export interface TextFieldProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<any>;
  required?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const Select = ({ data, helperText, inputRef, required, onChange }: TextFieldProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { name, children, attributes } = data;
  const { label, values, type, isLeaf, isDecision } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const messageValue = getMessageByValue({ options, value });

    onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value });
    setMessage(messageValue);
  };

  return (
    <FormControl required={required} ref={ref} fullWidth>
      <InputLabel id={`${name}-label`} shrink>
        {label}
      </InputLabel>
      <SelectDS
        labelId={`${name}-label`}
        id={name}
        label={label}
        name={name}
        onChange={handleChange}
        defaultValue=""
        inputRef={inputRef}
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
