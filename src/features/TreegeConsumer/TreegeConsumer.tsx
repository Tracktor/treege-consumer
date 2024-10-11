import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress, ThemeOptions, ThemeProvider, useTheme } from "@tracktor/design-system";
import dayjs from "dayjs";
import { CSSProperties } from "react";
import OptionsProvider from "@/context/OptionsContext";
import Standard from "@/features/TreegeConsumer/Standard";
import Stepper from "@/features/TreegeConsumer/Stepper";
import useTreegeConsumer from "@/features/TreegeConsumer/useTreegeConsumer";
import { Headers } from "@/types/Headers";
import { JsonFormValue } from "@/types/JsonFormValue";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import "dayjs/locale/fr";
import TreeNode from "@/types/TreeNode";

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
    countryAutocompleteService?: string;
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
}

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={navigator.language.slice(0, 2)}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme || themeProvider.palette.mode}>
          {loading ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <OptionsProvider options={options}>
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
                />
              )}
            </OptionsProvider>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default TreegeConsumer;
