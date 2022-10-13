import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
} from "design-system-tracktor";
import { ChangeEvent, MouseEvent, useState } from "react";
import TreegeConsumer, { TreegeConsumerProps } from "@/features/TreegeConsumer";
import mockTree from "@/mock/export.json";
import type { TreeNode } from "@/types/TreeNode";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(mockTree);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("stepper");
  const [formData, setFormData] = useState<[string, FormDataEntryValue][]>();

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChangeVariant = (_: MouseEvent<HTMLElement>, newAlignment: TreegeConsumerProps["variant"]) => {
    setVariant(newAlignment);
  };

  const handleChangeTree = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setTree(JSON.parse(value));
  };

  const handleSubmit = (data: [string, FormDataEntryValue][]) => {
    setFormData(data);
    setDialogOpen(true);
  };

  return (
    <Grid container>
      <Grid item md={6}>
        <TextareaAutosize
          minRows={40}
          value={JSON.stringify(tree, null, 2)}
          style={{ height: "100%", whiteSpace: "nowrap", width: "100%" }}
          onChange={handleChangeTree}
        />
      </Grid>
      <Grid item md={6}>
        <Box display="flex" justifyContent="center" padding={5}>
          <ToggleButtonGroup value={variant} size="small" onChange={handleChangeVariant} exclusive>
            <ToggleButton value="stepper">Stepper</ToggleButton>
            <ToggleButton value="standard">Standard</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <TreegeConsumer
          tree={tree}
          variant={variant}
          onSubmit={handleSubmit}
          options={{ googleApiKey: "AIzaSyCEE2sZpLEpujo22Liix8ZizOYiqYQkWTc" }}
        />
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle id="alert-dialog-title">Result:</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{JSON.stringify(formData, null, 2)}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};
export default App;
