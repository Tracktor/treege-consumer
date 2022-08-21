import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grow,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "design-system";
import { ChangeEvent, memo, useCallback } from "react";
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
    (ref: HTMLInputElement, index?: number) => {
      if (!ref || !autoFocus || (index && index > 0)) {
        return null;
      }

      setTimeout(() => ref.focus(), animationTimeout);

      return null;
    },
    [animationTimeout, autoFocus]
  );

  if (type === "select") {
    return (
      <Grow timeout={animationTimeout} in unmountOnExit mountOnEnter>
        <FormControl required={required} fullWidth>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select labelId={`${name}-label`} id={name} label={label} name={name} onChange={onChange} defaultValue="" inputRef={inputRef}>
            {children?.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.attributes.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grow>
    );
  }

  if (type === "radio") {
    return (
      <Grow timeout={animationTimeout} in unmountOnExit mountOnEnter>
        <FormControl required={required} fullWidth>
          <FormLabel id={`${name}-label`}>{label}</FormLabel>
          <RadioGroup aria-labelledby={`${name}-label`} name={name} onChange={onChange} defaultValue="">
            {children?.map((option, index) => (
              <FormControlLabel
                key={option.name}
                value={option.name}
                label={option.attributes.label}
                control={<Radio inputRef={(ref) => inputRef(ref, index)} />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grow>
    );
  }

  if (type === "checkbox") {
    return (
      <Grow timeout={animationTimeout} in unmountOnExit mountOnEnter>
        <FormGroup>
          <FormControlLabel label={label} control={<Checkbox name={name} inputRef={inputRef} />} />
        </FormGroup>
      </Grow>
    );
  }

  if (type === "switch") {
    return (
      <Grow timeout={animationTimeout} in unmountOnExit mountOnEnter>
        <FormGroup>
          <FormControlLabel label={label} control={<Switch name={name} inputRef={inputRef} />} />
        </FormGroup>
      </Grow>
    );
  }

  return (
    <Grow timeout={animationTimeout} in unmountOnExit mountOnEnter>
      <TextField name={name} label={label} type={type} onChange={onChange} required={required} inputRef={inputRef} />
    </Grow>
  );
};

export default memo(TreegeField);
