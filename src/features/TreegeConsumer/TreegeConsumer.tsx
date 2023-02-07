import { Box, Button, ButtonGroup, Grow, Slide, Stack, Typography } from "@tracktor/design-system";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import NavigateBeforeRounded from "@/components/Icon/NavigateBeforeRounded/NavigateBeforeRounded";
import NavigateNextRounded from "@/components/Icon/NavigateNextRounded/NavigateNextRounded";
import OptionsProvider from "@/context/Options/OptionsProvider";
import FormValidation from "@/features/TreegeConsumer/components/FormValidation/FormValidation";
import TreegeField from "@/features/TreegeConsumer/components/TreegeField/TreegeField";
import useTreegeConsumer from "@/features/TreegeConsumer/useTreegeConsumer";
import type { TreeNode } from "@/types/TreeNode";

interface BaseTreegeConsumerProps {
  dataFormatOnSubmit?: "formData" | "json";
  tree?: TreeNode;
  variant?: "standard" | "stepper";
  options?: {
    countryAutocompleteService?: string;
    googleApiKey?: string;
  };
  onSubmit?(data: { [k: string]: FormDataEntryValue } | [string, FormDataEntryValue][]): void;
}

type FormDataTreegeConsumerProps = BaseTreegeConsumerProps & {
  dataFormatOnSubmit?: "formData";
  onSubmit?(data: [string, FormDataEntryValue][]): void;
};

type JsonTreegeConsumerProps = BaseTreegeConsumerProps & {
  dataFormatOnSubmit?: "json";
  onSubmit?(data: { [key: string]: FormDataEntryValue }): void;
};

export type TreegeConsumerProps = FormDataTreegeConsumerProps | JsonTreegeConsumerProps;

const TreegeConsumer = ({ tree, onSubmit, options, variant = "stepper", dataFormatOnSubmit = "formData" }: TreegeConsumerProps) => {
  const { activeFieldIndex, fields, handleChange, firstFieldIndex, handlePrev, handleSubmit, isLastField } = useTreegeConsumer({
    dataFormatOnSubmit,
    onSubmit,
    tree,
    variant,
  });

  return (
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
        >
          <Stack paddingY={2} spacing={fields ? 0 : 3} direction="column">
            {fields ? (
              fields.map((field, index) => {
                const active = index === activeFieldIndex;
                return <TreegeField key={field.name} data={field} onChange={handleChange} autoFocus={active} visible={active} />;
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
        <Box onSubmit={handleSubmit} component="form" paddingX={15}>
          <Stack paddingY={5} spacing={3} direction="column">
            {fields ? (
              fields.map((field, index) => <TreegeField data={field} key={field.name} onChange={handleChange} autoFocus={index === 0} />)
            ) : (
              <FormSkeleton />
            )}
          </Stack>
          {isLastField && <FormValidation />}
        </Box>
      )}
    </OptionsProvider>
  );
};

export default TreegeConsumer;
