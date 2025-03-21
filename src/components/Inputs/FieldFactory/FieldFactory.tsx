import { Box, Skeleton, Slide } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import { memo, useCallback, useState } from "react";
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
import { TreegeConsumerProps } from "@/features/TreegeConsumer/TreegeConsumer";
import useOptionsContext from "@/hooks/useOptionsContext";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";

export interface FielFactoryProps {
  fieldValues?: FieldValues;
  animated?: boolean;
  autoFocus?: boolean;
  data: TreeNode;
  visible?: boolean;
  readOnly?: boolean;
  headers?: HeadersInit;
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
  const [error, setError] = useState("");
  const { attributes, uuid } = data;
  const { type, label, required, helperText, isMultiple, parentRef, isDisabledPast, name, pattern, patternMessage } = attributes;
  const errorOrHelperText = error || helperText;
  const animationTimeout = animated ? 200 : 0;
  const isRequired = visible && required;
  const isHidden = type === "hidden";
  const hasParentRefValue = !!(parentRef && !fieldValues?.[parentRef]);
  const isParentFieldRequiredAndEmpty = isSubmitting || hasParentRefValue;
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

  const handleChange = useCallback(
    (dataAttribute: ChangeEventField) => {
      if (dataAttribute.value) {
        setError("");
      }

      handleChangeFormValue?.({
        ...dataAttribute,
        uuid,
      });
    },
    [handleChangeFormValue, uuid],
  );

  const handleInputRef = useCallback(
    (nodeElement: HTMLInputElement | null | { node: HTMLInputElement; value: string }) => {
      const element = nodeElement && "node" in nodeElement ? nodeElement.node : nodeElement;

      // Display error message on invalid event
      if (element && !options?.noValidate) {
        // Handle invalid event with custom pattern message
        const handleInvalid = (event: Event) => {
          event.preventDefault();

          const inputElement = event.target as HTMLInputElement;

          // Check if validation failed due to pattern mismatch and we have a custom message
          if (inputElement.validity && inputElement.validity.patternMismatch && patternMessage) {
            // Prevent the browser's default validation message

            // Set our custom error message
            setError(patternMessage);
          } else if (inputElement.validationMessage) {
            // For other validation errors, use the browser's message
            setError(inputElement.validationMessage);
          }
        };

        // Clean up old event listeners in case this function runs multiple times
        element.removeEventListener("invalid", handleInvalid);

        // Add event listeners
        element.addEventListener("invalid", handleInvalid);

        // If the pattern attribute is set, add a title attribute with the error message
        if (pattern && patternMessage) {
          element.setAttribute("title", patternMessage);
        }
      }

      if (!element || !autoFocus || element.tabIndex > 0) {
        return;
      }

      setTimeout(() => element.focus(), animationTimeout);
    },
    [animationTimeout, autoFocus, options?.noValidate, pattern, patternMessage],
  );

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
            onChange={handleChange}
            readOnly={readOnly}
            name={name}
            label={label}
            type={type}
            value={value}
            required={isRequired}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            multiple={isMultiple}
            isIgnored={isFieldIgnored}
            pattern={pattern}
            patternMessage={patternMessage}
            error={!!error}
          />
        );
      case "file":
        return (
          <File
            onChange={handleChange}
            readOnly={readOnly}
            inputRef={handleInputRef}
            name={name}
            label={label}
            required={isRequired}
            helperText={errorOrHelperText}
            multiple={isMultiple}
            isIgnored={isFieldIgnored}
            pattern={pattern}
            patternMessage={patternMessage}
            error={!!error}
          />
        );
      case "date":
        return (
          <DatePicker
            readOnly={readOnly}
            onChange={handleChange}
            name={name}
            label={label}
            required={isRequired}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            value={value}
            disablePast={disablePastDatePicker}
            isIgnored={isFieldIgnored}
            pattern={pattern}
            patternMessage={patternMessage}
            error={!!error}
          />
        );
      case "time":
        return (
          <TimePicker
            readOnly={readOnly}
            onChange={handleChange}
            name={name}
            label={label}
            required={isRequired}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            value={value}
            isIgnored={isFieldIgnored}
            pattern={pattern}
            patternMessage={patternMessage}
            error={!!error}
          />
        );
      case "timeRange":
        return (
          <TimeRange
            readOnly={readOnly}
            onChange={handleChange}
            name={name}
            label={label}
            required={isRequired}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            value={value}
            pattern={pattern}
            isIgnored={isFieldIgnored}
            error={!!error}
          />
        );
      case "dateRange":
        return (
          <DateRange
            readOnly={readOnly}
            onChange={handleChange}
            name={name}
            label={label}
            disablePast={!!isDisabledPast || disablePastDateRangePicker}
            required={isRequired}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            value={value}
            pattern={pattern}
            isIgnored={isFieldIgnored}
            licenseMuiX={licenseMuiX}
            error={!!error}
          />
        );
      case "address":
        return (
          <Address
            readOnly={readOnly}
            node={data}
            onChange={handleChange}
            helperText={errorOrHelperText}
            inputRef={handleInputRef}
            value={value}
            isIgnored={isFieldIgnored}
            country={country}
            pattern={pattern}
            googleApiKey={googleApiKey}
            error={!!error}
          />
        );
      case "radio":
        return (
          <Radio
            data={data}
            onChange={handleChange}
            onInit={handleChangeFormValue}
            readOnly={readOnly}
            inputRef={handleInputRef}
            required={isRequired}
            helperText={errorOrHelperText}
            value={value}
            isIgnored={isFieldIgnored}
            error={!!error}
          />
        );
      case "select":
        return (
          <Select
            data={data}
            onChange={handleChange}
            onInit={handleChangeFormValue}
            readOnly={readOnly}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            required={isRequired}
            value={value}
            isIgnored={isFieldIgnored}
            error={!!error}
          />
        );
      case "checkbox":
        return (
          <CheckBoxField
            data={data}
            onChange={handleChange}
            readOnly={readOnly}
            helperText={errorOrHelperText}
            value={value}
            isIgnored={isFieldIgnored}
            required={isRequired}
            error={!!error}
          />
        );
      case "switch":
        return (
          <SwitchField
            data={data}
            onChange={handleChange}
            readOnly={readOnly}
            inputRef={handleInputRef}
            helperText={errorOrHelperText}
            value={value}
            isIgnored={isFieldIgnored}
            error={!!error}
          />
        );
      case "autocomplete":
        return (
          <ApiAutocomplete
            node={data}
            onChange={handleChange}
            readOnly={readOnly}
            headers={headers}
            inputRef={handleInputRef}
            value={value}
            helperText={errorOrHelperText}
            prefixResponseImageUriAutocomplete={prefixResponseImageUriAutocomplete}
            isIgnored={isFieldIgnored}
            error={!!error}
          />
        );
      case "dynamicSelect":
        return (
          <DynamicSelect
            onChange={handleChange}
            fieldValues={fieldValues}
            node={data}
            headers={headers}
            value={value}
            isParentFieldRequiredAndEmpty={isParentFieldRequiredAndEmpty}
            inputRef={handleInputRef}
            isIgnored={isFieldIgnored}
            helperText={errorOrHelperText}
            error={!!error}
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
      in={visible}
      timeout={animationTimeout}
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
