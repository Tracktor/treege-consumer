import { Box, Button, ButtonGroup, Slide, Stack, Typography } from "design-system";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import NavigateBeforeRounded from "@/components/Icon/NavigateBeforeRounded/NavigateBeforeRounded";
import NavigateNextRounded from "@/components/Icon/NavigateNextRounded/NavigateNextRounded";
import FormValidation from "@/features/TreegeForm/FormValidation/FormValidation";
import TreegeField from "@/features/TreegeForm/TreegeField/TreegeField";
import useTreegeForm from "@/features/TreegeForm/useTreegeForm";
import type { TreeNode } from "@/types/TreeNode";

export interface TreegeFormProps {
  tree?: TreeNode;
  variant?: "standard" | "stepper";
}

const TreegeForm = ({ tree, variant = "stepper" }: TreegeFormProps) => {
  const { activeFieldIndex, fields, handleChange, handlePrev, handleSubmit, isLastField } = useTreegeForm({ tree, variant });

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
      >
        <Stack paddingY={5} spacing={fields ? 0 : 3} direction="column">
          {fields ? (
            fields.map((field, index) => {
              const active = index === activeFieldIndex;
              const disabled = !active;

              return (
                <Slide key={field.name} in={active} mountOnEnter>
                  <Box flexDirection="column" sx={{ display: active ? "flex" : "none" }}>
                    <TreegeField key={field.name} data={field} onChange={handleChange} autoFocus={!disabled} />
                  </Box>
                </Slide>
              );
            })
          ) : (
            <FormSkeleton />
          )}
        </Stack>

        {isLastField && (
          <Box textAlign="right">
            <Typography variant="h5" my={2}>
              <div>Le formulaire est maintenant terminé,</div> <div>voulez-vous le valider ?</div>
            </Typography>
          </Box>
        )}

        <Stack alignItems="flex-end" spacing={2}>
          {fields && (
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button disabled={activeFieldIndex === 0} onClick={handlePrev}>
                <NavigateBeforeRounded />
              </Button>
              <Button type="submit" disabled={isLastField}>
                <NavigateNextRounded />
              </Button>
            </ButtonGroup>
          )}

          {isLastField && <FormValidation />}
        </Stack>
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
