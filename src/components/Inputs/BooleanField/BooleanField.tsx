import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface BooleanFieldProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<HTMLInputElement>;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  value?: unknown;
}

const BooleanField = ({ data, inputRef, helperText, readOnly, onChange, value }: BooleanFieldProps, ref: Ref<unknown | undefined>) => {
  const { name, attributes, children } = data;
  const { label, type, isLeaf, messages } = attributes;
  const [message, setMessage] = useState<string | undefined>(messages?.off);
  const Field = type === "checkbox" ? Checkbox : Switch;

  const handleCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const hasMessage = checked ? messages?.on : messages?.off;

      onChange?.({ children, event, hasMessage: !!hasMessage, isLeaf, name, type, value: checked });
      setMessage(hasMessage);
    },
    [children, isLeaf, messages, name, onChange, type],
  );

  return (
    <FormControl aria-readonly={readOnly} fullWidth>
      <FormGroup ref={ref}>
        <FormControlLabel
          label={label}
          aria-readonly={readOnly}
          control={
            <Field name={name} onChange={handleCheck} inputRef={inputRef} checked={!!value} readOnly={readOnly} disabled={readOnly} />
          }
          sx={{
            ...(readOnly && {
              "& .MuiFormControlLabel-label.Mui-disabled": {
                color: "text.primary",
              },
            }),
          }}
        />
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
