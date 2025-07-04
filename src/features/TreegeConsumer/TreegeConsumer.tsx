import { LocalizationProvider, PickersInputLocaleText } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LicenseInfo } from "@mui/x-license";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress, Stack, ThemeOptions, ThemeProvider, useTheme } from "@tracktor/design-system";
import type { TreeNode } from "@tracktor/types-treege";
import dayjs from "dayjs";
import { CSSProperties, ReactNode, useLayoutEffect } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FieldFactory from "@/components/FieldFactory";
import FormValidation, { RenderFormValidationParams } from "@/components/Form/FormValidation";
import OptionsProvider from "@/context/OptionsProvider";
import useTreegeConsumer from "@/features/TreegeConsumer/useTreegeConsumer";
import useOptionsContext from "@/hooks/useOptionsContext";
import { JsonFormValue } from "@/types/JsonFormValue";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import "dayjs/locale/fr";
import getLocalText from "@/utils/getLocalText/getLocalText";

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
    adapterLocale?: "fr" | "en" | "de" | "es" | "pt" | "it" | string;
    /**
     * Indicate that the form is not to be validated on submitting
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
  headers?: HeadersInit;
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
   * Locale text for the date pickers
   */
  localText?: PickersInputLocaleText;

  /**
   * Callback fired when the user submits a form.
   * @param data
   * @param formData
   * @param fieldValues
   * @param detailFieldValues
   */
  onSubmit?({ data, formData, fieldValues, detailFieldValues }: OnSubmitReturn): void;
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
  localText,
}: TreegeConsumerProps<T>) => {
  const { fields, handleChangeFormValue, handleSubmit, isLastField, fieldValues, formCanBeSubmit, detailFieldValues } = useTreegeConsumer({
    debug,
    disabledSubmitButton,
    initialValues,
    onSubmit,
    options,
    tree,
  });
  const themeProvider = useTheme();
  const queryClient = new QueryClient();
  const optionsContext = useOptionsContext();
  const adapterLocale = options?.adapterLocale || optionsContext?.adapterLocale || navigator?.language?.slice(0, 2);

  /**
   * Set license key for mui x
   */
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale} localeText={getLocalText(adapterLocale, localText)}>
          <Box noValidate onSubmit={handleSubmit} component="form" paddingX={15} paddingY={5} style={style}>
            <Stack spacing={4} direction="column" sx={{ "div:first-of-type hr": { display: "none" } }}>
              {fields ? (
                fields.map((field) => (
                  <FieldFactory
                    key={field.uuid}
                    data={field}
                    detailFieldValues={detailFieldValues}
                    handleChangeFormValue={handleChangeFormValue}
                    readOnly={readOnly}
                    headers={headers}
                    fieldValues={fieldValues}
                    isSubmitting={isSubmitting}
                    ignoreFields={ignoreFields}
                    options={options}
                  />
                ))
              ) : (
                <FormSkeleton />
              )}
            </Stack>
            <FormValidation
              disabled={!formCanBeSubmit}
              isLoading={isSubmitting}
              readOnly={readOnly}
              isLastField={isLastField}
              renderFormValidation={renderFormValidation}
            />
          </Box>
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
  localText,
}: TreegeConsumerProps<T>) => (
  <OptionsProvider>
    <TreegeComposition
      options={options}
      loading={loading}
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
      localText={localText}
    />
  </OptionsProvider>
);

export default TreegeConsumer;
