import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { ChangeEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface SwitchFieldProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<HTMLInputElement>;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  value?: unknown;
  isIgnored?: boolean;
  error?: boolean;
  ancestorValue?: unknown;
}

const SwitchField = (
  { data, inputRef, helperText, readOnly, onChange, value, isIgnored, error, ancestorValue }: SwitchFieldProps,
  ref: Ref<unknown | undefined>,
) => {
  const stringAncestor = typeof ancestorValue === "string" ? String(ancestorValue) : undefined;
  const ancestorHasValue = !!stringAncestor?.length;

  const [isActive, setIsActive] = useState<boolean>(ancestorHasValue || !!value);
  const lastAncestorRef = useRef(ancestorHasValue);

  const { attributes, children } = data;
  const { label, type, isLeaf, messages, name } = attributes;
  const [message, setMessage] = useState<string | undefined>(messages?.off);
  const Field = type === "checkbox" ? Checkbox : Switch;

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const hasMessage = checked ? messages?.on : messages?.off;

    setIsActive(checked);
    onChange?.({ children, event, hasMessage: !!hasMessage, isLeaf, name, type, value: checked });
    setMessage(hasMessage);
  };

  // Update local state when ancestorValue changes
  useEffect(() => {
    if (ancestorHasValue !== lastAncestorRef.current) {
      setIsActive(ancestorHasValue || false);
      lastAncestorRef.current = ancestorHasValue;

      // Call onChange with the new ancestorValue
      onChange?.({ event: undefined, name, type, value: lastAncestorRef.current });
    }
  }, [ancestorHasValue, ancestorValue, name, onChange, type]);

  if (isIgnored) {
    return null;
  }

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
              value={isActive}
              checked={isActive}
              readOnly={readOnly}
              disabled={readOnly}
              color={error ? "error" : undefined}
            />
          }
          sx={{
            ...(error && {
              "& .MuiRadio-root": {
                borderColor: "red",
              },
            }),
            ...(readOnly && {
              "& .MuiFormControlLabel-label.Mui-disabled": {
                color: "text.primary",
              },
            }),
          }}
        />
      </FormGroup>
      {helperText && <FormHelperText sx={{ ...(error && { color: "error.main" }) }}>{helperText}</FormHelperText>}
      {message && (
        <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </FormControl>
  );
};

export default forwardRef(SwitchField);
