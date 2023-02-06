import { Box, Skeleton, Slide } from "@tracktor/design-system";
import { memo, useCallback } from "react";
import Autocomplete from "@/components/Inputs/Autocomplete/Autocomplete";
import BooleanField from "@/components/Inputs/BooleanField/BooleanField";
import HiddenField from "@/components/Inputs/HiddenField/HiddenField";
import Radio from "@/components/Inputs/Radio/Radio";
import Select from "@/components/Inputs/Select/Select";
import TextField from "@/components/Inputs/TextField/TextField";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import type { TreeNode } from "@/types/TreeNode";

export interface TreegeFieldProps {
  animated?: boolean;
  autoFocus?: boolean;
  data: TreeNode;
  visible?: boolean;
  onChange?(dataAttribute?: ChangeEventField): void;
}

const TreegeField = ({ animated = true, autoFocus, data, visible = true, onChange }: TreegeFieldProps) => {
  const { name, attributes } = data;
  const { type, label, required, helperText } = attributes;
  const animationTimeout = animated ? 200 : 0;
  const isRequired = visible && required;
  const isHidden = type === "hidden";

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
            helperText={helperText}
          />
        );
      case "address":
        return <Autocomplete label={label} name={name} inputRef={inputRef} required={isRequired} helperText={helperText} />;
      case "radio":
        return <Radio data={data} inputRef={inputRef} required={isRequired} onChange={onChange} helperText={helperText} />;
      case "select":
        return <Select data={data} inputRef={inputRef} required={isRequired} onChange={onChange} helperText={helperText} />;
      case "switch":
      case "checkbox":
        return <BooleanField data={data} inputRef={inputRef} onChange={onChange} helperText={helperText} />;
      default:
        return <Skeleton variant="rounded" width="100%" height={56} animation={false} />;
    }
  };

  if (isHidden) {
    return <HiddenField data={data} />;
  }

  return (
    <Slide timeout={animationTimeout} in={visible} mountOnEnter>
      <Box flexDirection="column" sx={{ display: visible ? "flex" : "none" }}>
        {field()}
      </Box>
    </Slide>
  );
};

export default memo(TreegeField);
