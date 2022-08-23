import { Grow, SelectChangeEvent, Skeleton } from "design-system";
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
  onChange?(event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

const TreegeField = ({ animated = true, autoFocus, data, onChange }: TreegeFieldProps) => {
  const { name, children, attributes } = data;
  const { type, label, required } = attributes;
  const animationTimeout = animated ? 200 : 0;

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
      case "number":
      case "text":
        return <TextField name={name} label={label} type={type} onChange={onChange} required={required} inputRef={inputRef} />;
      case "address":
        return <Autocomplete label={label} name={name} inputRef={inputRef} />;
      case "checkbox":
        return <Checkbox label={label} inputRef={inputRef} name={name} />;
      case "radio":
        return <Radio data={children} label={label} inputRef={inputRef} name={name} onChange={onChange} />;
      case "select":
        return <Select data={children} label={label} inputRef={inputRef} name={name} onChange={onChange} />;
      case "switch":
        return <Switch label={label} inputRef={inputRef} name={name} />;
      default:
        return <Skeleton variant="rounded" width="100%" height={56} animation={false} />;
    }
  };

  return (
    <Grow timeout={animationTimeout} in unmountOnExit mountOnEnter>
      {field()}
    </Grow>
  );
};

export default memo(TreegeField);
