import { Box, SelectChangeEvent, Skeleton, Slide } from "design-system";
import { ChangeEvent, memo, useCallback } from "react";
import Autocomplete from "@/components/Inputs/Autocomplete/Autocomplete";
import Checkbox from "@/components/Inputs/Checkbox/Checkbox";
import Radio from "@/components/Inputs/Radio/Radio";
import Select from "@/components/Inputs/Select/Select";
import Switch from "@/components/Inputs/Switch/Switch";
import TextField from "@/components/Inputs/TextField/TextField";
import type { TreeNode } from "@/types/TreeNode";

export interface TreegeFieldProps {
  animated?: boolean;
  autoFocus?: boolean;
  data: TreeNode;
  visible?: boolean;
  onChange?(event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const TreegeField = ({ animated = true, autoFocus, data, visible = true, onChange }: TreegeFieldProps) => {
  const { name, attributes } = data;
  const { type, label, required, description } = attributes;
  const animationTimeout = animated ? 200 : 0;
  const isRequired = visible && required;

  const inputRef = useCallback(
    (ref: HTMLInputElement) => {
      if (!ref || !autoFocus || ref?.tabIndex > 0) {
        return null;
      }

      setTimeout(() => ref.focus(), animationTimeout);

      return null;
    },
    [animationTimeout, autoFocus]
  );

  const field = () => {
    switch (type) {
      case "date":
      case "email":
      case "file":
      case "number":
      case "password":
      case "tel":
      case "time":
      case "text":
      case "url":
        return (
          <TextField
            name={name}
            label={label}
            type={type}
            onChange={onChange}
            required={isRequired}
            inputRef={inputRef}
            helperText={attributes.description}
          />
        );
      case "address":
        return <Autocomplete label={label} name={name} inputRef={inputRef} required={isRequired} helperText={description} />;
      case "checkbox":
        return <Checkbox label={label} inputRef={inputRef} name={name} helperText={description} />;
      case "radio":
        return <Radio data={data} inputRef={inputRef} required={isRequired} onChange={onChange} helperText={description} />;
      case "select":
        return <Select data={data} inputRef={inputRef} required={isRequired} onChange={onChange} helperText={description} />;
      case "switch":
        return <Switch label={label} inputRef={inputRef} name={name} helperText={description} />;
      default:
        return <Skeleton variant="rounded" width="100%" height={56} animation={false} />;
    }
  };

  return (
    <Slide timeout={animationTimeout} in={visible} mountOnEnter>
      <Box flexDirection="column" sx={{ display: visible ? "flex" : "none" }}>
        {field()}
      </Box>
    </Slide>
  );
};

export default memo(TreegeField);
