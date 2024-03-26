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
  variant: "standard" | "stepper" | undefined;
  renderData: "json" | "formData" | undefined;
  dialogOpen: boolean;
  customHeaders?: Headers;
  handleCloseDialog: () => void;
  formData: JsonFormValue[] | [string, unknown][] | undefined;
  handleChangeTree: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (submitData: JsonFormValue[] | [string, unknown][]) => void;
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
  handleChangeFormatData: (_: MouseEvent<HTMLElement>, newRenderData: "json" | "formData") => void;
  handleChangeVariant: (_: MouseEvent<HTMLElement>, newAlignment: "standard" | "stepper" | undefined) => void;
}

const Sandbox = ({
  tree,
  handleChangeTree,
  handleChangeVariant,
  variant,
  renderData,
  handleSubmit,
  dialogOpen,
  customHeaders,
  handleCloseDialog,
  formData,
  handleChangeComponent,
  handleChangeFormatData,
}: SandboxProps) => (
  <ThemeProvider>
    <Grid container height="100%">
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          maxHeight: "100%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <TextareaAutosize
          minRows={10}
          value={JSON.stringify(tree, null, 2)}
          style={{ height: "100%", whiteSpace: "nowrap", width: "100%" }}
          onChange={handleChangeTree}
        />
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          height: "100%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Stack spacing={2} pt={4}>
          <Button variant="link" onClick={() => handleChangeComponent("DataViewer")}>
            See values
          </Button>
          <Box display="flex" justifyContent="center" pt={2}>
            <ToggleButtonGroup value={variant} size="small" onChange={handleChangeVariant} exclusive>
              <ToggleButton value="stepper">Stepper</ToggleButton>
              <ToggleButton value="standard">Standard</ToggleButton>
            </ToggleButtonGroup>
            <Box mx={1} />
            <ToggleButtonGroup value={renderData} size="small" onChange={handleChangeFormatData} exclusive>
              <ToggleButton value="formData">Form</ToggleButton>
              <ToggleButton value="json">Json</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box flex={1} pt={2}>
            <TreegeConsumer
              tree={tree}
              variant={variant}
              onSubmit={handleSubmit}
              options={{ googleApiKey: "YOUR_SECRET_KEY" }}
              headers={customHeaders}
              dataFormatOnSubmit={renderData}
            />
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
        </Stack>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Sandbox;
