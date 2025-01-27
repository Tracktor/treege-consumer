import { Box, Skeleton, Slide } from "@tracktor/design-system";
import { memo } from "react";
import Address from "@/components/Inputs/Address";
import ApiAutocomplete from "@/components/Inputs/ApiAutocomplete";
import CheckBoxField from "@/components/Inputs/CheckBoxField";
import DatePicker from "@/components/Inputs/DatePicker";
import DateRange from "@/components/Inputs/DateRange";
import DynamicSelect from "@/components/Inputs/DynamicSelect";
import File from "@/components/Inputs/File";
import HiddenField from "@/components/Inputs/HiddenField";
import Radio from "@/components/Inputs/Radio";
import Select from "@/components/Inputs/Select";
import SwitchField from "@/components/Inputs/SwitchField";
import TextField from "@/components/Inputs/TextField";
import TimePicker from "@/components/Inputs/TimePicker";
import TimeRange from "@/components/Inputs/TimeRange";
import Title from "@/components/Inputs/Title";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import useOptionsContext from "@/hooks/useOptionsContext";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import { Headers } from "@/types/Headers";
import TreeNode from "@/types/TreeNode";

export interface FielFactoryProps {
  fieldValues?: FieldValues;
  animated?: boolean;
  autoFocus?: boolean;
  data: TreeNode;
  visible?: boolean;
  readOnly?: boolean;
  headers?: Headers;
  isSubmitting?: boolean;
  disableDivider?: boolean;
  ignoreFields?: string[];
  options?: TreegeConsumerProps["options"];
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
 * @param disableDivider
 * @constructor
 */
const FieldFactory = ({
  handleChangeFormValue,
  autoFocus,
  data,
  readOnly,
  headers,
  fieldValues,
  isSubmitting,
  ignoreFields,
  disableDivider,
  options,
  animated = true,
  visible = true,
}: FielFactoryProps) => {
  const { attributes } = data;
  const { type, label, required, helperText, isMultiple, parentRef, isDisabledPast, name } = attributes;
  const animationTimeout = animated ? 200 : 0;
  const isRequired = visible && required;
  const isHidden = type === "hidden";
  const hasParentRefValue = !!(parentRef && !fieldValues?.[parentRef]);
  const disabledChildrenField = isSubmitting || hasParentRefValue;
  const value = fieldValues?.[name] || "";
  const isFieldIgnored = !!ignoreFields?.find((fieldName) => fieldName === name);
  const optionsContext = useOptionsContext();
  const licenseMuiX = options?.licenseMuiX || optionsContext?.licenseMuiX;
  const googleApiKey = options?.googleApiKey || optionsContext?.googleApiKey;
  const country = options?.countryAutocompleteService || optionsContext?.countryAutocompleteService;
  const disablePastDatePicker = options?.disablePastDatePicker || optionsContext?.disablePastDatePicker;
  const disablePastDateRangePicker = options?.disablePastDateRangePicker || optionsContext?.disablePastDateRangePicker;
  const prefixResponseImageUriAutocomplete =
    options?.prefixResponseImageUriAutocomplete || optionsContext?.prefixResponseImageUriAutocomplete;

  const inputRef = (ref: HTMLInputElement) => {
    if (!ref || !autoFocus || ref?.tabIndex > 0) {
      return null;
    }
    setTimeout(() => ref.focus(), animationTimeout);
    return null;
  };

  const field = () => {
    switch (type) {
      case "email":
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
      case "file":
        return (
          <File
            name={name}
            label={label}
            onChange={handleChangeFormValue}
            required={isRequired}
            helperText={helperText}
            readOnly={readOnly}
            multiple={isMultiple}
            isIgnored={isFieldIgnored}
          />
        );
      case "date":
        return (
          <DatePicker
            name={name}
            label={label}
            onChange={handleChangeFormValue}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            disablePast={disablePastDatePicker}
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
            disablePast={!!isDisabledPast || disablePastDateRangePicker}
            onChange={handleChangeFormValue}
            required={isRequired}
            inputRef={inputRef}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
            licenseMuiX={licenseMuiX}
          />
        );
      case "address":
        return (
          <Address
            inputRef={inputRef}
            value={value}
            readOnly={readOnly}
            node={data}
            onChange={handleChangeFormValue}
            isIgnored={isFieldIgnored}
            country={country}
            googleApiKey={googleApiKey}
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
            required={isRequired}
            value={value}
            isIgnored={isFieldIgnored}
          />
        );
      case "checkbox":
        return (
          <CheckBoxField
            data={data}
            onChange={handleChangeFormValue}
            helperText={helperText}
            value={value}
            readOnly={readOnly}
            isIgnored={isFieldIgnored}
            required={isRequired}
          />
        );
      case "switch":
        return (
          <SwitchField
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
            prefixResponseImageUriAutocomplete={prefixResponseImageUriAutocomplete}
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
      case "title":
        return <Title label={label} disableDivider={disableDivider} />;
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
      <Box
        flexDirection="column"
        sx={{
          display: visible ? "flex" : "none",
          ...(type === "title" && { margin: "0 !important" }),
        }}
      >
        {field()}
      </Box>
    </Slide>
  );
};

export default memo(FieldFactory);
