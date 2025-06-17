import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { ChangeEvent, forwardRef, Ref, useEffect, useRef } from "react";
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
  const isActive = ancestorValue || !!value;
  const lastAncestorRef = useRef(ancestorValue);

  const { attributes, children } = data;
  const { label, type, isLeaf, messages, name } = attributes;

  const message = isActive ? messages?.on : messages?.off;
  const Field = type === "checkbox" ? Checkbox : Switch;

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const hasMessage = checked ? messages?.on : messages?.off;

    onChange?.({
      children,
      event,
      hasMessage: !!hasMessage,
      isLeaf,
      name,
      type,
      value: checked,
    });
  };

  // Update the last ancestor value to trigger onChange only when it changes
  useEffect(() => {
    if (ancestorValue !== lastAncestorRef.current) {
      lastAncestorRef.current = ancestorValue;

      onChange?.({
        children,
        event: undefined,
        hasMessage: !!(ancestorValue ? messages?.on : messages?.off),
        isLeaf,
        name,
        type,
        value: lastAncestorRef.current,
      });
    }
  }, [ancestorValue, children, isLeaf, messages?.off, messages?.on, name, onChange, type]);

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
              value={!!isActive}
              checked={!!isActive}
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
