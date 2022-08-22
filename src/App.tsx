import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "design-system";
import { MouseEvent, useState } from "react";
import TreegeForm, { TreegeFormProps } from "@/features/TreegeForm";
import tree from "@/mock/basic.json";

const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeFormProps["variant"]>("stepper");
  const [formData, setFormData] = useState<[string, FormDataEntryValue][]>();

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (_: MouseEvent<HTMLElement>, newAlignment: TreegeFormProps["variant"]) => {
    setVariant(newAlignment);
  };

  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    setFormData(data);
    setDialogOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" padding={5}>
        <ToggleButtonGroup value={variant} size="small" onChange={handleChange} exclusive>
          <ToggleButton value="stepper">Stepper</ToggleButton>
          <ToggleButton value="standard">Standard</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TreegeForm tree={tree} variant={variant} onSubmit={handleSubmit} />

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">Result:</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{JSON.stringify(formData, null, 2)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default App;
