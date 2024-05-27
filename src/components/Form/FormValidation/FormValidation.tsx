import { Box, Button, Slide } from "@tracktor/design-system";

interface FormValidationProps {
  formCanBeSubmit: boolean;
}

const FormValidation = ({ formCanBeSubmit }: FormValidationProps) => (
  <Slide direction="up" in mountOnEnter>
    <Box display="flex" alignItems="center" justifyContent="center" paddingY={5}>
      <Button variant="contained" type="submit" disabled={!formCanBeSubmit}>
        Valider
      </Button>
    </Box>
  </Slide>
);

export default FormValidation;
