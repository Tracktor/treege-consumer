import { Alert, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio as RadioDS, RadioGroup } from "@tracktor/design-system";
import { ChangeEvent, forwardRef, Ref, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import useInputs from "@/hooks/useInputs";
import type TreeNode from "@/types/TreeNode";

export interface RadioProps {
  data: TreeNode;
  helperText?: string;
  inputRef: Ref<any>;
  required?: boolean;
  defaultValue?: unknown;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const Radio = ({ data, helperText, inputRef, required, onChange, readOnly, defaultValue = "" }: RadioProps, ref: Ref<HTMLDivElement>) => {
  const { getOptionsForDecisionsField, getMessageByValue } = useInputs();
  const { name, children, attributes } = data;
  const { label, values, type, isLeaf, isDecision } = attributes;
  const [message, setMessage] = useState<string | undefined>("");
  const options = getOptionsForDecisionsField({ children, values });

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    const messageValue = getMessageByValue({ options, value });

    onChange?.({ children, event, hasMessage: !!messageValue, isDecision, isLeaf, name, type, value });
    setMessage(messageValue);
  };

  return (
    <FormControl required={required} ref={ref} aria-readonly={readOnly} fullWidth>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${name}-label`}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue ? `${name}:${defaultValue}` : undefined}
        aria-readonly={readOnly}
      >
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
