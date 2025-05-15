import { Alert, FormControl, FormControlLabel, FormHelperText, Radio as RadioDS, RadioGroup, Stack } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { ChangeEvent, forwardRef, Ref, useCallback, useEffect, useRef, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import useInputs from "@/hooks/useInputs";
import ChangeEventField from "@/types/ChangeEventField";

export interface RadioProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  value?: unknown;
  readOnly?: boolean;
  isIgnored?: boolean;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  onInit?(dataAttribute: ChangeEventField): void;
}

const Radio = (
  { data, helperText, inputRef, required, onChange, onInit, readOnly, value, isIgnored, error }: RadioProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { children, attributes, uuid } = data;
  const { label, values, type, isLeaf, isDecision, name } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });
  const onInitRef = useRef(onInit);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, fieldValue: string) => {
      const messageValue = getMessageByValue({ options, value: fieldValue });

      onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value: fieldValue });
      setMessage(messageValue);
    },
    [children, getMessageByValue, isDecision, isLeaf, name, onChange, options, type],
  );

  // If there's no selected value, only one child option, and the field is required,
  useEffect(() => {
    // we auto-select the single available option.
    if (!value && children.length === 1 && required) {
      const singleOption = options[0];
      if (singleOption) {
        // Retrieve the message associated with the selected option (if any).
        const messageValue = getMessageByValue({ options, value: singleOption.value });

        // Trigger the onChange callback to propagate the selection upstream.
        onChange?.({
          children,
          event: undefined, // No user event triggered this — it's an automatic selection.
          hasMessage: !!messageValue,
          isDecision,
          isLeaf,
          name,
          type,
          value: singleOption.value,
        });

        // Store the message locally to be displayed in the UI
        setMessage(messageValue);
      }
    }
  }, [children, getMessageByValue, isDecision, isLeaf, name, onChange, options, required, type, value]);

  // Trigger the onInit when the component is mounted
  useEffect(() => {
    if (isDecision && value) {
      onInitRef.current?.({ children, isDecision, isLeaf, name, type, value });
    }
  }, [children, isDecision, isLeaf, name, type, value]);

  // Update the onInitRef when the onInit changes
  useEffect(() => {
    onInitRef.current = onInit;
  }, [onInit]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <FormControl required={required} ref={ref} aria-readonly={readOnly} fullWidth>
        <RadioGroup aria-labelledby={`${name}-label`} name={name} onChange={handleChange} value={value} aria-readonly={readOnly}>
          <Stack spacing={1}>
            {options?.map((option, index) => {
              const id = `${uuid}-${index}`;

              return (
                <FormControlLabel
                  key={option.key}
                  value={option.value}
                  label={option.label}
                  htmlFor={id}
                  variant="card"
                  aria-label={option.label}
                  data-label-name-value={`${name}-${option.value}`}
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
                  control={
                    <RadioDS
                      inputRef={inputRef}
                      data-index={index}
                      inputProps={{ tabIndex: index }}
                      readOnly={readOnly}
                      disabled={readOnly}
                      required={required}
                      id={id}
                    />
                  }
                />
              );
            })}
          </Stack>
        </RadioGroup>
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

export default forwardRef(Radio);
