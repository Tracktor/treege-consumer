import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress, ThemeOptions, ThemeProvider, useTheme } from "@tracktor/design-system";
import dayjs from "dayjs";
import { CSSProperties } from "react";
import OptionsProvider from "@/context/OptionsContext";
import Standard from "@/features/TreegeConsumer/Standard";
import Stepper from "@/features/TreegeConsumer/Stepper";
import useTreegeConsumer, { OnSubmitReturn } from "@/features/TreegeConsumer/useTreegeConsumer";
import Headers from "@/types/Headers";
import { JsonFormValue } from "@/types/JsonFormValue";
import TreeNode from "@/types/TreeNode";
import "dayjs/locale/fr";

dayjs.locale("fr");

export interface TreegeConsumerProps {
  /**
   * Tree data from treege
   */
  tree?: TreeNode | null;
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
   * Callback fired when the user submit form.
   */
  isLoadingFormValidation?: boolean;
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
   * Callback fired when the user submit form.
   * @param data
   * @param formData
   * @param fieldValues
   */
  onSubmit?({ data, formData, fieldValues }: OnSubmitReturn): void;
}

const TreegeConsumer = ({
  tree,
  onSubmit,
  options,
  theme,
  loading,
  style,
  readOnly,
  headers,
  isLoadingFormValidation,
  initialValues,
  ignoreFields,
  debug,
  variant = "standard",
}: TreegeConsumerProps) => {
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
                  isLoadingFormValidation={isLoadingFormValidation}
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
                  isLoadingFormValidation={isLoadingFormValidation}
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
