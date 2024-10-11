import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextareaAutosize,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@tracktor/design-system";
import { ChangeEvent, MouseEvent, ReactNode, SyntheticEvent, useState } from "react";
import TreegeConsumer from "@/features/TreegeConsumer";
import { Headers } from "@/types/Headers";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import TreeNode from "@/types/TreeNode";

interface SandboxProps {
  tree: TreeNode;
  variant: "standard" | "stepper" | undefined;
  dialogOpen: boolean;
  customHeaders?: Headers;
  submitData?: OnSubmitReturn;
  handleCloseDialog: () => void;
  handleChangeTree: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: ({ data, formData, fieldValues }: OnSubmitReturn) => void;
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
  handleChangeVariant: (_: MouseEvent<HTMLElement>, newAlignment: "standard" | "stepper" | undefined) => void;
  isSubmitting?: boolean;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Sandbox = ({
  tree,
  handleChangeTree,
  handleChangeVariant,
  variant,
  onSubmit,
  submitData,
  dialogOpen,
  customHeaders,
  isSubmitting,
  handleCloseDialog,
  handleChangeComponent,
}: SandboxProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme="dark">
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
            style={{
              background: "black",
              color: "green",
              height: "100%",
              whiteSpace: "nowrap",
              width: "100%",
            }}
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
            </Box>
            <Box flex={1} pt={2}>
              <TreegeConsumer
                debug
                tree={tree}
                variant={variant}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                headers={customHeaders}
                options={{
                  disablePastDatePicker: true,
                  disablePastDateRangePicker: true,
                }}
              />
            </Box>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md" scroll="body">
              <DialogTitle id="alert-dialog-title">Result:</DialogTitle>

              <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Data" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Form Data" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab label="FieldValues" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <pre>{JSON.stringify(submitData?.data, null, 2)}</pre>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <pre>{JSON.stringify(submitData?.formData, null, 2)}</pre>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <pre>{JSON.stringify(submitData?.fieldValues, null, 2)}</pre>
                </CustomTabPanel>
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
};

export default Sandbox;
