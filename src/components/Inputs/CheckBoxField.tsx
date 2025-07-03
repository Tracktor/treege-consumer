import { Alert, FormControl, FormControlLabel, FormGroup, FormHelperText, Radio, Stack } from "@tracktor/design-system";
import { isBoolean } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { forwardRef, Ref, useEffect, useRef, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";

export interface CheckBoxFieldProps {
  data: TreeNode;
  helperText?: string;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  value?: unknown;
  isIgnored?: boolean;
  required?: boolean;
  error?: boolean;
  ancestorValue?: unknown;
}

const CheckBoxField = (
  { data, helperText, readOnly, onChange, value, isIgnored, required, error, ancestorValue }: CheckBoxFieldProps,
  ref: Ref<unknown | undefined>,
) => {
  const lastAncestorRef = useRef(ancestorValue);

  const { attributes, children, uuid } = data;
  const { label, type, isLeaf, messages, name } = attributes;
  const [message, setMessage] = useState<string | undefined>(messages?.off);

  const handleCheck = (checked: boolean) => {
    const hasMessage = checked ? messages?.on : messages?.off;

    onChange?.({ children, hasMessage: !!hasMessage, isLeaf, name, type, value: checked });
    setMessage(hasMessage);
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
        value: ancestorValue,
      });
    }
  }, [ancestorValue, children, isLeaf, messages?.off, messages?.on, name, onChange, type]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl aria-readonly={readOnly} fullWidth>
        <FormGroup ref={ref}>
          <Stack spacing={1}>
            <FormControlLabel
              variant="card"
              value={value}
              checked={isBoolean(value) ? value : !!value}
              label="Oui"
              data-label-name-value={`${name}-yes`}
              name={name}
              htmlFor={`${uuid}-yes`}
              control={<Radio id={`${uuid}-yes`} />}
              onChange={() => handleCheck(true)}
              sx={{
                ...(error && {
                  "& .MuiRadio-root": {
                    borderColor: "red",
                  },
                }),
              }}
            />
            <FormControlLabel
              variant="card"
              checked={!value}
              value={!value}
              label="Non"
              data-label-name-value={`${name}-no`}
              name={name}
              htmlFor={`${uuid}-yes`}
              control={<Radio id={`${uuid}-no`} />}
              onChange={() => handleCheck(false)}
            />
          </Stack>
        </FormGroup>
        {helperText && <FormHelperText sx={{ ...(error && { color: "error.main" }) }}>{helperText}</FormHelperText>}
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
