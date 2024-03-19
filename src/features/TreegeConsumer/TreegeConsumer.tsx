import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grow,
  Slide,
  Stack,
  ThemeOptions,
  ThemeProvider,
  Typography,
  useTheme,
} from "@tracktor/design-system";
import type { CSSProperties } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FieldFactory from "@/components/FieldFactory";
import FormValidation from "@/components/FormValidation";
import NavigateBeforeRounded from "@/components/Icon/NavigateBeforeRounded/NavigateBeforeRounded";
import NavigateNextRounded from "@/components/Icon/NavigateNextRounded/NavigateNextRounded";
import OptionsProvider from "@/context/Options/OptionsProvider";
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

export type TreegeConsumerProps = FormDataTreegeConsumerProps | JsonTreegeConsumerProps;

const TreegeConsumer = ({
  tree,
  onSubmit,
  options,
  theme,
  loading,
  style,
  initialValues,
  readOnly,
  headers,
  variant = "standard",
  dataFormatOnSubmit = "json",
}: TreegeConsumerProps) => {
  const { activeFieldIndex, fields, handleChange, firstFieldIndex, handlePrev, handleSubmit, isLastField, fieldValues } = useTreegeConsumer(
    {
      dataFormatOnSubmit,
      onSubmit,
      tree,
      variant,
    },
  );
  const themeProvider = useTheme();
  const queryClient = new QueryClient();

  console.log("fieldValues", fieldValues);

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
              <Box
                onSubmit={handleSubmit}
                component="form"
                paddingX={15}
                height="100%"
                justifyContent="center"
                display="flex"
                flexDirection="column"
                overflow="hidden"
                style={style}
              >
                <Stack paddingY={2} spacing={fields ? 0 : 3} direction="column">
                  {fields ? (
                    fields.map((field, index) => {
                      const active = index === activeFieldIndex;
                      const initialValuesValue = initialValues && initialValues[field.name];

                      return (
                        <FieldFactory
                          key={field.name}
                          data={field}
                          onChange={handleChange}
                          autoFocus={active}
                          visible={active}
                          defaultValue={initialValuesValue}
                          readOnly={readOnly}
                          headers={headers}
                          treeValue={fieldValues}
                        />
                      );
                    })
                  ) : (
                    <FormSkeleton />
                  )}
                </Stack>

                {isLastField && (
                  <Grow in mountOnEnter>
                    <Box textAlign="right">
                      <Typography variant="h5" my={2}>
                        <div>Le formulaire est maintenant terminé,</div> <div>voulez-vous le valider ?</div>
                      </Typography>
                    </Box>
                  </Grow>
                )}

                {fields && (
                  <Stack alignItems="flex-end" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Slide direction="right" in={!isLastField} mountOnEnter>
                        <Typography variant="caption" textAlign="right">
                          Pour valider, appuyer sur <strong>ENTRÉE ↵</strong>
                        </Typography>
                      </Slide>
                      <Slide direction="up" in mountOnEnter style={{ transitionDelay: 150 as unknown as string }}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                          <Button disabled={activeFieldIndex === firstFieldIndex} onClick={handlePrev}>
                            <NavigateBeforeRounded />
                          </Button>
                          <Button type="submit" disabled={isLastField}>
                            <NavigateNextRounded />
                          </Button>
                        </ButtonGroup>
                      </Slide>
                    </Stack>

                    {isLastField && <FormValidation />}
                  </Stack>
                )}
              </Box>
            ) : (
              <Box onSubmit={handleSubmit} component="form" paddingX={15} style={style}>
                <Stack paddingY={5} spacing={3} direction="column">
                  {fields ? (
                    fields.map((field, index) => {
                      const initialValuesValue = initialValues && initialValues[field.name];

                      return (
                        <FieldFactory
                          key={field.name}
                          data={field}
                          onChange={handleChange}
                          autoFocus={index === 0}
                          defaultValue={initialValuesValue}
                          readOnly={readOnly}
                          headers={headers}
                        />
                      );
                    })
                  ) : (
                    <FormSkeleton />
                  )}
                </Stack>
                {isLastField && !readOnly && <FormValidation />}
              </Box>
            )}
          </OptionsProvider>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default TreegeConsumer;
