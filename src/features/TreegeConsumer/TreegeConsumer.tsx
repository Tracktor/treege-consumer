import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LicenseInfo } from "@mui/x-license";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress, ThemeOptions, ThemeProvider, useTheme } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import dayjs from "dayjs";
import { CSSProperties, ReactNode, useLayoutEffect } from "react";
import { RenderFormValidationParams } from "@/components/Form/FormValidation";
import OptionsProvider from "@/context/OptionsProvider";
import Standard from "@/features/TreegeConsumer/Standard";
import Stepper from "@/features/TreegeConsumer/Stepper";
import useTreegeConsumer from "@/features/TreegeConsumer/useTreegeConsumer";
import useOptionsContext from "@/hooks/useOptionsContext";
import { Headers } from "@/types/Headers";
import { JsonFormValue } from "@/types/JsonFormValue";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import "dayjs/locale/fr";

dayjs.locale("fr");

export interface TreegeConsumerProps<T = unknown> {
  /**
   * Tree data from treege
   */
  tree?: T | TreeNode | null;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * The variant of the stepper. If not set, it will use the variant of the parent ThemeProvider.
   */
  variant?: "standard" | "stepper";
  /**
   *  The theme of Treege Consumer. If not set, it will use the theme of the parent ThemeProvider.
   */
  theme?: "dark" | "light" | ThemeOptions;
  /**
   * Consumer options
   */
  options?: {
    /**
     * The language of the autocomplete service google
     */
    countryAutocompleteService?: string | string[];
    /**
     * Provide google api key for autocomplete service
     */
    googleApiKey?: string;
    /**
     * Prefix response image uri for autocomplete image
     */
    prefixResponseImageUriAutocomplete?: string;
    /**
     * License mui x pro or premium
     */
    licenseMuiX?: string;
    /**
     * Disable past date picker
     */
    disablePastDatePicker?: boolean;
    /**
     * Disable past date range picker
     */
    disablePastDateRangePicker?: boolean;
    /**
     * Locale for adapter
     */
    adapterLocale?: string;
    /**
     * Indicate that the form is not to be validated on submit
     */
    noValidate?: boolean;
  };
  /**
   * Custom form style
   */
  style?: CSSProperties;
  /**
   * If true, the form input will be disabled.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Headers for fetch request
   */
  headers?: Headers;
  /**
   * initial Values
   */
  initialValues?: JsonFormValue[];
  /**
   * Array of field name that we want to ignore
   */
  ignoreFields?: string[];
  /**
   * If true, submit data will be logged in the console.
   * @default false
   */
  debug?: boolean;
  /**
   * Boolean to disable submit button
   */
  disabledSubmitButton?: boolean;
  /**
   * Boolean to disable submit button while submitting
   */
  isSubmitting?: boolean;
  /**
   * Callback fired when the user submit form.
   * @param data
   * @param formData
   * @param fieldValues
   */
  onSubmit?({ data, formData, fieldValues }: OnSubmitReturn): void;
  /**
   *  Render custom validation component
   */
  renderFormValidation?(params: RenderFormValidationParams): ReactNode;
}

const TreegeComposition = <T,>({
  tree,
  onSubmit,
  options,
  loading,
  style,
  readOnly,
  headers,
  theme,
  initialValues,
  ignoreFields,
  debug,
  disabledSubmitButton,
  isSubmitting,
  renderFormValidation,
  variant = "standard",
}: TreegeConsumerProps<T>) => {
  const {
    activeFieldIndex,
    fields,
    handleChangeFormValue,
    firstFieldIndex,
    handlePrev,
    handleSubmit,
    isLastField,
    fieldValues,
    formCanBeSubmit,
  } = useTreegeConsumer({
    debug,
    disabledSubmitButton,
    initialValues,
    onSubmit,
    tree,
    variant,
  });
  const themeProvider = useTheme();
  const queryClient = new QueryClient();
  const optionsContext = useOptionsContext();
  const adapterLocale = options?.adapterLocale || optionsContext?.adapterLocale || navigator?.language?.slice(0, 2);

  useLayoutEffect(() => {
    if (options?.licenseMuiX) {
      LicenseInfo.setLicenseKey(options?.licenseMuiX);
    }
  }, [options?.licenseMuiX]);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" style={style}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme || themeProvider.palette.mode}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale}>
          {variant === "stepper" ? (
            <Stepper
              activeFieldIndex={activeFieldIndex}
              firstFieldIndex={firstFieldIndex}
              isLastField={isLastField}
              style={style}
              fields={fields}
              readOnly={readOnly}
              headers={headers}
              fieldValues={fieldValues}
              isSubmitting={isSubmitting}
              handleChangeFormValue={handleChangeFormValue}
              handlePrev={handlePrev}
              handleSubmit={handleSubmit}
              formCanBeSubmit={formCanBeSubmit}
              options={options}
              renderFormValidation={renderFormValidation}
            />
          ) : (
            <Standard
              fields={fields}
              handleChangeFormValue={handleChangeFormValue}
              handleSubmit={handleSubmit}
              isLastField={isLastField}
              readOnly={readOnly}
              headers={headers}
              fieldValues={fieldValues}
              isSubmitting={isSubmitting}
              style={style}
              formCanBeSubmit={formCanBeSubmit}
              ignoreFields={ignoreFields}
              options={options}
              renderFormValidation={renderFormValidation}
            />
          )}
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const TreegeConsumer = <T,>({
  tree,
  onSubmit,
  options,
  theme,
  loading,
  style,
  readOnly,
  headers,
  initialValues,
  ignoreFields,
  debug,
  disabledSubmitButton,
  isSubmitting,
  renderFormValidation,
  variant = "standard",
}: TreegeConsumerProps<T>) => (
  <OptionsProvider>
    <TreegeComposition
      options={options}
      loading={loading}
      variant={variant}
      onSubmit={onSubmit}
      tree={tree}
      isSubmitting={isSubmitting}
      style={style}
      readOnly={readOnly}
      headers={headers}
      theme={theme}
      initialValues={initialValues}
      ignoreFields={ignoreFields}
      debug={debug}
      renderFormValidation={renderFormValidation}
      disabledSubmitButton={disabledSubmitButton}
    />
  </OptionsProvider>
);

export default TreegeConsumer;
