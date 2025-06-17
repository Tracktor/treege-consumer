import { Alert, FormControl, FormControlLabel, FormHelperText, Radio as RadioDS, RadioGroup, Stack } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { ChangeEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";
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
  ancestorValue?: unknown;
}

const Radio = (
  { data, helperText, inputRef, required, onChange, onInit, readOnly, value, isIgnored, error, ancestorValue }: RadioProps,
  ref: Ref<HTMLDivElement>,
) => {
  const stringAncestor = typeof ancestorValue === "string" ? ancestorValue : undefined;
  const ancestorRef = useRef<string>();
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { children, attributes, uuid } = data;
  const { label, values, type, isLeaf, isDecision, name } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });
  const onInitRef = useRef(onInit);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, fieldValue: string) => {
    const messageValue = getMessageByValue({ options, value: fieldValue });

    onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value: fieldValue });
    setMessage(messageValue);
  };

  // If there's no selected value, only one child option, or a string ancestor, select the option by default
  useEffect(() => {
    const getSelectedValue = (): string | undefined => {
      if (stringAncestor && stringAncestor !== ancestorRef.current) {
        ancestorRef.current = stringAncestor;
        return stringAncestor;
      }

      if (!value) {
        return (children.length === 1 && required && options[0]?.value) || stringAncestor;
      }
      return undefined;
    };

    const selectedValue = getSelectedValue();

    if (selectedValue) {
      const messageValue = getMessageByValue({ options, value: selectedValue });

      onChange?.({
        children,
        event: undefined,
        hasMessage: !!messageValue,
        isDecision,
        isLeaf,
        name,
        type,
        value: selectedValue,
      });

      setMessage(messageValue);
    }
  }, [children, getMessageByValue, isDecision, isLeaf, name, onChange, options, required, stringAncestor, type, value, ancestorValue]);
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
