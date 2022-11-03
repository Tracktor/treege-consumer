import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from "design-system-tracktor";
import { ChangeEvent, forwardRef, Ref, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import type { TreeNode } from "@/types/TreeNode";

export interface BooleanFieldProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<any>;
  onChange?(dataAttribute: ChangeEventField): void;
}

const BooleanField = ({ data, inputRef, helperText, onChange }: BooleanFieldProps, ref: Ref<unknown | undefined>) => {
  const { name, attributes, children } = data;
  const { label, type, isLeaf, messages } = attributes;

  const Field = type === "checkbox" ? Checkbox : Switch;
  const [message, setMessage] = useState<string | undefined>(messages?.off);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const hasMessage = checked ? messages?.on : messages?.off;

    onChange?.({ children, event, hasMessage: !!hasMessage, isLeaf, name, type, value: checked });
    setMessage(hasMessage);
  };

  return (
    <FormControl fullWidth>
      <FormGroup ref={ref}>
        <FormControlLabel label={label} control={<Field name={name} onChange={handleCheck} inputRef={inputRef} />} />
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {message && (
        <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </FormControl>
  );
};

export default forwardRef(BooleanField);
