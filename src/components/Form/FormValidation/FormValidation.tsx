import { Box, Button, Slide } from "@tracktor/design-system";

interface FormValidationProps {
  disabled?: boolean;
  isLoading?: boolean;
  isLastField?: boolean;
  readOnly?: boolean;
}

const FormValidation = ({ disabled, isLoading, readOnly, isLastField }: FormValidationProps) => {
  if (readOnly || !isLastField) {
    return null;
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
