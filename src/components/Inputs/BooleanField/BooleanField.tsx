import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useCallback, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import type { TreeNode } from "@/types/TreeNode";

export interface BooleanFieldProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<any>;
  defaultValue?: unknown;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const BooleanField = (
  { defaultValue, data, inputRef, helperText, readOnly, onChange }: BooleanFieldProps,
  ref: Ref<unknown | undefined>,
) => {
  const { name, attributes, children } = data;
  const { label, type, isLeaf, messages } = attributes;
  const [message, setMessage] = useState<string | undefined>(messages?.off);
  const Field = type === "checkbox" ? Checkbox : Switch;
  const defaultChecked = defaultValue === "true" || defaultValue === true || defaultValue === "on" || defaultValue === "yes";

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
            <Field
              name={name}
              onChange={handleCheck}
              inputRef={inputRef}
              defaultChecked={defaultChecked}
              readOnly={readOnly}
              disabled={readOnly}
            />
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
