import { Box, Button, ButtonGroup, Grow, Slide, Stack, Typography } from "design-system-tracktor";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import NavigateBeforeRounded from "@/components/Icon/NavigateBeforeRounded/NavigateBeforeRounded";
import NavigateNextRounded from "@/components/Icon/NavigateNextRounded/NavigateNextRounded";
import FormValidation from "@/features/TreegeForm/FormValidation/FormValidation";
import TreegeField from "@/features/TreegeForm/TreegeField/TreegeField";
import useTreegeForm from "@/features/TreegeForm/useTreegeForm";
import type { TreeNode } from "@/types/TreeNode";

interface BaseTreegeFormProps {
  dataFormatOnSubmit?: "formData" | "json";
  tree?: TreeNode;
  variant?: "standard" | "stepper";
  onSubmit?(data: { [k: string]: FormDataEntryValue } | [string, FormDataEntryValue][]): void;
}

type FormDataTreegeFormProps = BaseTreegeFormProps & {
  dataFormatOnSubmit?: "formData";
  onSubmit?(data: [string, FormDataEntryValue][]): void;
};

type JsonTreegeFormProps = BaseTreegeFormProps & {
  dataFormatOnSubmit?: "json";
  onSubmit?(data: { [key: string]: FormDataEntryValue }): void;
};

export type TreegeFormProps = FormDataTreegeFormProps | JsonTreegeFormProps;

const TreegeForm = ({ dataFormatOnSubmit = "formData", tree, onSubmit, variant = "stepper" }: TreegeFormProps) => {
  const { activeFieldIndex, fields, handleChange, handlePrev, handleSubmit, isLastField } = useTreegeForm({
    dataFormatOnSubmit,
    onSubmit,
    tree,
    variant,
  });

  if (variant === "stepper") {
    return (
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
                  <Button disabled={activeFieldIndex === 0} onClick={handlePrev}>
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
    );
  }

  return (
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
  );
};

export default TreegeForm;
