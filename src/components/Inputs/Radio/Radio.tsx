import { Alert, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio as RadioDS, RadioGroup } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";
import useInputs from "@/hooks/useInputs";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface RadioProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<unknown>;
  required?: boolean;
  value?: unknown;
  readOnly?: boolean;
  isIgnored?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  onInit?(dataAttribute: ChangeEventField): void;
}

const Radio = (
  { data, helperText, inputRef, required, onChange, onInit, readOnly, value, isIgnored }: RadioProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { children, attributes } = data;
  const { label, values, type, isLeaf, isDecision, name } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });
  const onInitRef = useRef(onInit);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, fieldValue: string) => {
    const messageValue = getMessageByValue({ options, value: fieldValue });

    onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value: fieldValue });
    setMessage(messageValue);
  };

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
    <FormControl required={required} ref={ref} aria-readonly={readOnly} fullWidth>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup aria-labelledby={`${name}-label`} name={name} onChange={handleChange} value={value} aria-readonly={readOnly}>
        {options?.map((option, index) => (
          <FormControlLabel
            key={option.key}
            value={option.value}
            label={option.label}
            control={
              <RadioDS inputRef={inputRef} data-index={index} inputProps={{ tabIndex: index }} readOnly={readOnly} disabled={readOnly} />
            }
            sx={{
              ...(readOnly && {
                "& .MuiFormControlLabel-label.Mui-disabled": {
                  color: "text.primary",
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {message && (
        <Alert severity="info" variant="standard" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}
    </FormControl>
  );
};

export default forwardRef(Radio);
