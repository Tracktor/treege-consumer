import { InputLabel, Stack, File as FileDS, Typography } from "@tracktor/design-system";
import { ChangeEvent } from "react";
import ChangeEventField from "@/types/ChangeEventField";

export interface TextFieldProps {
  label?: string;
  name: string;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
  value?: unknown;
  isIgnored?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
}

const File = ({ label, name, helperText, onChange, required, readOnly, multiple, value, isIgnored }: TextFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    onChange?.({ event, name, value: target.value });
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="h5" component={InputLabel} required={required} color="text.primary">
        {label}
      </Typography>
      <FileDS
        fullWidth
        disabled={readOnly}
        name={name}
        helperText={helperText || "PDF, PNG, JPG, ..."}
        onChange={handleChange}
        required={required}
        label={label}
        multiple={multiple}
        value={value}
      />
    </Stack>
  );
};

export default File;
