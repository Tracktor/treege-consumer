import { Box, Button, Slide } from "design-system";

const FormValidation = () => (
  <Slide direction="up" in mountOnEnter>
    <Box display="flex" alignItems="center" justifyContent="center" paddingBottom={5}>
      <Button variant="contained" type="submit">
        Valider
      </Button>
    </Box>
  </Slide>
);

export default FormValidation;
