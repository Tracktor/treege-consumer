import { Box, Button, ButtonGroup, Grow, Slide, Stack, Typography } from "@tracktor/design-system";
import { type CSSProperties, FormEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import FormSkeleton from "@/components/Feedback/FormSkeleton/FormSkeleton";
import FormValidation, { RenderFormValidationParams } from "@/components/Form/FormValidation";
import NavigateBeforeRounded from "@/components/Icon/NavigateBeforeRounded/NavigateBeforeRounded";
import NavigateNextRounded from "@/components/Icon/NavigateNextRounded/NavigateNextRounded";
import FieldFactory from "@/components/Inputs/FieldFactory";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import { Headers } from "@/types/Headers";
import TreeNode from "@/types/TreeNode";

interface StepperProps {
  fields?: TreeNode[];
  handleChangeFormValue?(dataAttribute: ChangeEventField): void;
  handlePrev?(_: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void;
  handleSubmit?(event: FormEvent<HTMLFormElement>): void;
  activeFieldIndex: number;
  firstFieldIndex: number;
  isLastField: boolean;
  readOnly?: boolean;
  headers?: Headers;
  fieldValues?: FieldValues;
  isSubmitting?: boolean;
  style?: CSSProperties;
  formCanBeSubmit: boolean;
  renderFormValidation?(params: RenderFormValidationParams): ReactNode;
}

const Stepper = ({
  isSubmitting,
  fields,
  activeFieldIndex,
  firstFieldIndex,
  isLastField,
  fieldValues,
  readOnly,
  headers,
  handleChangeFormValue,
  handlePrev,
  handleSubmit,
  style,
  formCanBeSubmit,
  renderFormValidation,
}: StepperProps) => (
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

          return (
            <FieldFactory
              disableDivider
              key={field.uuid}
              data={field}
              handleChangeFormValue={handleChangeFormValue}
              autoFocus={active}
              visible={active}
              readOnly={readOnly}
              headers={headers}
              fieldValues={fieldValues}
              isSubmitting={isSubmitting}
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
        <FormValidation
          disabled={!formCanBeSubmit}
          isLoading={isSubmitting}
          readOnly={readOnly}
          isLastField={isLastField}
          renderFormValidation={renderFormValidation}
        />
      </Stack>
    )}
  </Box>
);

export default Stepper;
