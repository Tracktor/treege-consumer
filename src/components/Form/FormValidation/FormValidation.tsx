import { Box, Button, Slide } from "@tracktor/design-system";
import { ReactNode } from "react";

export interface RenderFormValidationParams {
  disabled?: boolean;
  isLoading?: boolean;
}

interface FormValidationProps {
  disabled?: boolean;
  isLoading?: boolean;
  isLastField?: boolean;
  readOnly?: boolean;
  renderFormValidation?(params: RenderFormValidationParams): ReactNode;
}

const FormValidation = ({ disabled, isLoading, readOnly, isLastField, renderFormValidation }: FormValidationProps) => {
  if (readOnly || !isLastField) {
    return null;
  }

  if (renderFormValidation) {
    return renderFormValidation({ disabled, isLoading });
  }

  return (
    <Slide direction="up" in mountOnEnter>
      <Box display="flex" alignItems="center" justifyContent="center" paddingY={5}>
        <Button variant="contained" type="submit" disabled={disabled} isLoading={isLoading}>
          Valider
        </Button>
      </Box>
    </Slide>
  );
};

export default FormValidation;
