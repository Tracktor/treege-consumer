import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextareaAutosize,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
} from "@tracktor/design-system";
import { ChangeEvent, MouseEvent } from "react";
import TreegeConsumer from "@/features/TreegeConsumer";
import Headers from "@/types/Headers";
import type TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface SandboxProps {
  tree: TreeNode;
  handleChangeTree: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  variant: "standard" | "stepper" | undefined;
  handleSubmit: (submitData: JsonFormValue[] | [string, unknown][]) => void;
  handleChangeVariant: (_: MouseEvent<HTMLElement>, newAlignment: "standard" | "stepper" | undefined) => void;
  dialogOpen: boolean;
  customHeaders: Headers;
  handleCloseDialog: () => void;
  formData: JsonFormValue[] | [string, unknown][] | undefined;
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
}

const Sandbox = ({
  tree,
  handleChangeTree,
  handleChangeVariant,
  variant,
  handleSubmit,
  dialogOpen,
  customHeaders,
  handleCloseDialog,
  formData,
  handleChangeComponent,
}: SandboxProps) => (
  <ThemeProvider>
    <Grid container height="100%">
      <Grid item md={6}>
        <TextareaAutosize
          minRows={10}
          value={JSON.stringify(tree, null, 2)}
          style={{ height: "100%", whiteSpace: "nowrap", width: "100%" }}
          onChange={handleChangeTree}
        />
      </Grid>
      <Grid item md={6}>
        <Stack alignItems="center" p={3}>
          <Button variant="link" onClick={() => handleChangeComponent("DataViewer")}>
            See TreegeValuesConsumer
          </Button>
        </Stack>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
          <Box display="flex" justifyContent="center" padding={5}>
            <ToggleButtonGroup value={variant} size="small" onChange={handleChangeVariant} exclusive>
              <ToggleButton value="stepper">Stepper</ToggleButton>
              <ToggleButton value="standard">Standard</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box flex={1}>
            <TreegeConsumer
              tree={tree}
              variant={variant}
              onSubmit={handleSubmit}
              options={{ googleApiKey: "YOUR_SECRET_KEY" }}
              headers={customHeaders}
            />
          </Box>
        </Box>
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle id="alert-dialog-title">Result:</DialogTitle>
          <DialogContent>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Sandbox;
