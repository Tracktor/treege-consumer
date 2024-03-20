import { Box, Skeleton, Slide } from "@tracktor/design-system";
import { memo, useCallback } from "react";
import ApiAutocomplete from "@/components/Inputs/ApiAutocomplete";
import Autocomplete from "@/components/Inputs/Autocomplete";
import BooleanField from "@/components/Inputs/BooleanField";
import DateRange from "@/components/Inputs/DateRange";
import DynamicSelect from "@/components/Inputs/DynamicSelect";
import HiddenField from "@/components/Inputs/HiddenField";
import Radio from "@/components/Inputs/Radio";
import Select from "@/components/Inputs/Select";
import TextField from "@/components/Inputs/TextField";
import ChangeEventField from "@/types/ChangeEventField";
import Headers from "@/types/Headers";
import type TreeNode from "@/types/TreeNode";

export interface FielFactorydProps {
  fieldValues?: {
    [name: string]: {
      value: unknown;
      mustBeCompleted: boolean;
    };
  };
  animated?: boolean;
  autoFocus?: boolean;
  data: TreeNode;
  visible?: boolean;
  defaultValue?: unknown;
  readOnly?: boolean;
  onChange?(dataAttribute?: ChangeEventField): void;
  headers?: Headers;
}

/**
 * FieldFactory factory
 * @param defaultValueProps
 * @param onChange
 * @param autoFocus
 * @param data
 * @param readOnly
 * @param animated
 * @param visible
 * @param headers
 * @param fieldValues
 * @constructor
 */
const FieldFactory = ({
  defaultValue: defaultValueProps,
  onChange,
  autoFocus,
  data,
  readOnly,
  headers,
  fieldValues,
  animated = true,
  visible = true,
}: FielFactorydProps) => {
  const { name, attributes } = data;
  const { type, label, required, helperText, isMultiple, defaultValue: defaultValueAttribute } = attributes;

  const animationTimeout = animated ? 200 : 0;
  const isRequired = visible && required;
  const isHidden = type === "hidden";
  const defaultValue = defaultValueProps || defaultValueAttribute;

  const inputRef = (ref: HTMLInputElement) => {
    if (!ref || !autoFocus || ref?.tabIndex > 0) {
      return null;
    }
    setTimeout(() => ref.focus(), animationTimeout);
    return null;
  };

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
            defaultValue={defaultValue}
            readOnly={readOnly}
            multiple={isMultiple}
          />
        );
      case "dateRange":
        return (
          <DateRange
            name={name}
            label={label}
            type={type}
            onChange={onChange}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
        );
      case "address":
        return (
          <Autocomplete
            label={label}
            name={name}
            inputRef={inputRef}
            required={isRequired}
            helperText={helperText}
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
        );
      case "radio":
        return (
          <Radio
            data={data}
            inputRef={inputRef}
            required={isRequired}
            onChange={onChange}
            helperText={helperText}
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
        );
      case "select":
        return (
          <Select
            data={data}
            inputRef={inputRef}
            onChange={onChange}
            helperText={helperText}
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
        );
      case "switch":
      case "checkbox":
        return (
          <BooleanField
            data={data}
            inputRef={inputRef}
            onChange={onChange}
            helperText={helperText}
            defaultValue={defaultValue}
            readOnly={readOnly}
          />
        );
      case "autocomplete":
        return (
          <ApiAutocomplete
            node={data}
            onChange={onChange}
            inputRef={inputRef}
            defaultValue={defaultValue}
            readOnly={readOnly}
            headers={headers}
          />
        );
      case "dynamicSelect":
        return <DynamicSelect onChange={onChange} fieldValues={fieldValues} node={data} headers={headers} />;
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

export default memo(FieldFactory);
