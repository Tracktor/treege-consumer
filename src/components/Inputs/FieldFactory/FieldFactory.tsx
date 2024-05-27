import { Box, Skeleton, Slide } from "@tracktor/design-system";
import { memo } from "react";
import ApiAutocomplete from "@/components/Inputs/ApiAutocomplete";
import Autocomplete from "@/components/Inputs/Autocomplete";
import BooleanField from "@/components/Inputs/BooleanField";
import DateRange from "@/components/Inputs/DateRange";
import DynamicSelect from "@/components/Inputs/DynamicSelect";
import HiddenField from "@/components/Inputs/HiddenField";
import Radio from "@/components/Inputs/Radio";
import Select from "@/components/Inputs/Select";
import TextField from "@/components/Inputs/TextField";
import TimePicker from "@/components/Inputs/TimePicker";
import TimeRange from "@/components/Inputs/TimeRange";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import Headers from "@/types/Headers";
import type TreeNode from "@/types/TreeNode";

export interface FielFactoryProps {
  fieldValues?: FieldValues;
  animated?: boolean;
  autoFocus?: boolean;
  data: TreeNode;
  visible?: boolean;
  readOnly?: boolean;
  headers?: Headers;
  isLoadingFormValidation?: boolean;
  ignoreFields?: string[];
  handleChangeFormValue?(dataAttribute?: ChangeEventField): void;
}

/**
 * FieldFactory factory
 * @param handleChangeFormValue
 * @param autoFocus
 * @param data
 * @param readOnly
 * @param animated
 * @param visible
 * @param headers
 * @param fieldValues
 * @param isLoadingFormValidation
 * @param ignoreFields
 * @constructor
 */
const FieldFactory = ({
  handleChangeFormValue,
  autoFocus,
  data,
  readOnly,
  headers,
  fieldValues,
  isLoadingFormValidation,
  ignoreFields,
  animated = true,
  visible = true,
}: FielFactoryProps) => {
  const { attributes } = data;
  const { type, label, required, helperText, isMultiple, parentRef, name } = attributes;
  const animationTimeout = animated ? 200 : 0;
  const isRequired = visible && required;
  const isHidden = type === "hidden";
  const hasParentRefValue = !!(parentRef && !fieldValues?.[parentRef]);
  const disabledChildrenField = isLoadingFormValidation || hasParentRefValue;
  const value = fieldValues?.[name] || "";
  const isFieldIgnored = !!ignoreFields?.find((fieldName) => fieldName === name);

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
      case "text":
      case "url":
        return (
          <TextField
            name={name}
            label={label}
            type={type}
            onChange={handleChangeFormValue}
            value={value}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            readOnly={readOnly}
            multiple={isMultiple}
            isIgnored={isFieldIgnored}
          />
        );
      case "time":
        return (
          <TimePicker
            name={name}
            label={label}
            onChange={handleChangeFormValue}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
          />
        );
      case "timeRange":
        return (
          <TimeRange
            name={name}
            label={label}
            onChange={handleChangeFormValue}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
          />
        );
      case "dateRange":
        return (
          <DateRange
            name={name}
            label={label}
            onChange={handleChangeFormValue}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
          />
        );
      case "address":
        return (
          <Autocomplete
            inputRef={inputRef}
            value={value}
            readOnly={readOnly}
            node={data}
            onChange={handleChangeFormValue}
            isIgnored={isFieldIgnored}
          />
        );
      case "radio":
        return (
          <Radio
            data={data}
            inputRef={inputRef}
            required={isRequired}
            onChange={handleChangeFormValue}
            onInit={handleChangeFormValue}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
          />
        );
      case "select":
        return (
          <Select
            data={data}
            inputRef={inputRef}
            onChange={handleChangeFormValue}
            onInit={handleChangeFormValue}
            helperText={helperText}
            readOnly={readOnly}
            value={value}
            isIgnored={isFieldIgnored}
          />
        );
      case "switch":
      case "checkbox":
        return (
          <BooleanField
            data={data}
            inputRef={inputRef}
            onChange={handleChangeFormValue}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
          />
        );
      case "autocomplete":
        return (
          <ApiAutocomplete
            node={data}
            value={value}
            onChange={handleChangeFormValue}
            inputRef={inputRef}
            readOnly={readOnly}
            headers={headers}
            isIgnored={isFieldIgnored}
          />
        );
      case "dynamicSelect":
        return (
          <DynamicSelect
            value={value}
            onChange={handleChangeFormValue}
            fieldValues={fieldValues}
            node={data}
            headers={headers}
            disabledChildrenField={disabledChildrenField}
            inputRef={inputRef}
            isIgnored={isFieldIgnored}
          />
        );
      default:
        return <Skeleton variant="rounded" width="100%" height={56} animation={false} />;
    }
  };

  if (isHidden) {
    return <HiddenField data={data} onInit={handleChangeFormValue} />;
  }

  return (
    <Slide
      mountOnEnter
      timeout={animationTimeout}
      in={visible}
      appear={!isFieldIgnored}
      style={isFieldIgnored ? { display: "none" } : undefined}
    >
      <Box flexDirection="column" sx={{ display: visible ? "flex" : "none" }}>
        {field()}
      </Box>
    </Slide>
  );
};

export default memo(FieldFactory);
