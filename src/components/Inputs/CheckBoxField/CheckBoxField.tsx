import {
  Alert,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  Radio,
  Stack,
  Typography,
} from "@tracktor/design-system";
import { forwardRef, Ref, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface CheckBoxFieldProps {
  data: TreeNode;
  helperText?: string;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  value?: unknown;
  isIgnored?: boolean;
  required?: boolean;
}

const CheckBoxField = (
  { data, helperText, readOnly, onChange, value, isIgnored, required }: CheckBoxFieldProps,
  ref: Ref<unknown | undefined>,
) => {
  const { attributes, children } = data;
  const { label, type, isLeaf, messages, name } = attributes;
  const [message, setMessage] = useState<string | undefined>(messages?.off);

  const handleCheck = (checked: boolean) => {
    const hasMessage = checked ? messages?.on : messages?.off;

    onChange?.({ children, hasMessage: !!hasMessage, isLeaf, name, type, value: checked });
    setMessage(hasMessage);
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <Typography component={InputLabel} variant="h5" required={required} color="text.primary">
        {label}
      </Typography>
      <FormControl aria-readonly={readOnly} fullWidth>
        <FormGroup ref={ref}>
          <Stack spacing={1}>
            <FormControlLabel variant="card" checked={!!value} control={<Radio />} label="Oui" onChange={() => handleCheck(true)} />
            <FormControlLabel variant="card" checked={!value} control={<Radio />} label="Non" onChange={() => handleCheck(false)} />
          </Stack>
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {message && (
          <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
            {message}
          </Alert>
        )}
      </FormControl>
    </Stack>
  );
};

export default forwardRef(CheckBoxField);
