import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress, ThemeOptions, ThemeProvider, useTheme } from "@tracktor/design-system";
import type { CSSProperties, ReactElement } from "react";
import OptionsProvider from "@/context/Options/OptionsProvider";
import Standard from "@/features/TreegeConsumer/Standard";
import Stepper from "@/features/TreegeConsumer/Stepper";
import useTreegeConsumer from "@/features/TreegeConsumer/useTreegeConsumer";
import Headers from "@/types/Headers";
import type TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface BaseTreegeConsumerProps {
  /**
   * Data format returned by onSubmit callback
   */
  dataFormatOnSubmit?: "formData" | "json";
  /**
   * Tree data from treege
   */
  tree?: TreeNode;
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
  };
  /**
   * Custom form style
   */
  style?: CSSProperties;
  /**
   * Initial values of the form
   */
  initialValues?: {
    [key: string]: unknown;
  };
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
  jsonInitialValues?: JsonFormValue[];
  /**
   * Render custom render input value ()
   */
  renderInput?(input: JsonFormValue): ReactElement | undefined;
}

type FormDataTreegeConsumerProps = BaseTreegeConsumerProps & {
  /**
   * Data format returned by onSubmit callback
   */
  dataFormatOnSubmit?: "formData";
  /**
   * Callback fired when the user submit form.
   * @param data
   */
  onSubmit?(data: [string, FormDataEntryValue][]): void;
};

type JsonTreegeConsumerProps = BaseTreegeConsumerProps & {
  /**
   * Data format returned by onSubmit callback
   */
  dataFormatOnSubmit?: "json";
  /**
   * Callback fired when the user submit form.
   * @param data
   */
  onSubmit?(data: JsonFormValue[]): void;
};
// Remove FormDataEntryValue

export type TreegeConsumerProps = FormDataTreegeConsumerProps | JsonTreegeConsumerProps;

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
  jsonInitialValues,
  variant = "standard",
  dataFormatOnSubmit = "json",
  renderInput,
}: TreegeConsumerProps) => {
  const {
    activeFieldIndex,
    fields,
    handleFormValue,
    firstFieldIndex,
    handlePrev,
    handleSubmit,
    isLastField,
    fieldValues,
    formCanBeSubmit,
  } = useTreegeConsumer({
    dataFormatOnSubmit,
    jsonInitialValues,
    onSubmit,
    tree,
    variant,
  });
  const themeProvider = useTheme();
  const queryClient = new QueryClient();
  const isCustomRenderInput = jsonInitialValues && renderInput;

  if (isCustomRenderInput) {
    return jsonInitialValues?.map((jsonInitialValue) => renderInput(jsonInitialValue));
  }

  return (
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
                handleFormValue={handleFormValue}
                handlePrev={handlePrev}
                handleSubmit={handleSubmit}
                formCanBeSubmit={formCanBeSubmit}
              />
            ) : (
              <Standard
                fields={fields}
                handleFormValue={handleFormValue}
                handleSubmit={handleSubmit}
                isLastField={isLastField}
                readOnly={readOnly}
                headers={headers}
                fieldValues={fieldValues}
                isLoadingFormValidation={isLoadingFormValidation}
                style={style}
                formCanBeSubmit={formCanBeSubmit}
              />
            )}
          </OptionsProvider>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default TreegeConsumer;
