import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Stack,
  Tab,
  Tabs,
  TextareaAutosize,
  ThemeProvider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@tracktor/design-system";
import ancestorAdvancedExample from "example/data/ancestorAdvancedExample";
import ancestorBasicExample from "example/data/ancestorBasicExample";
import autocompleteExampleWithAncestor from "example/data/autocompleteExampleWithAncestor";
import basicExample from "example/data/basicExample";
import { ReactNode, SyntheticEvent, useState } from "react";
import TreegeConsumer from "@/features/TreegeConsumer/TreegeConsumer";
import { TreegeConsumerProvider } from "@/main";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";

interface SandboxProps {
  dialogOpen: boolean;
  customHeaders?: HeadersInit;
  submitData?: OnSubmitReturn;
  handleCloseDialog: () => void;
  onSubmit: ({ data, formData, fieldValues }: OnSubmitReturn) => void;
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
  isSubmitting?: boolean;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TreeSampleTypes = {
  ancestorAdvanced: "ancestorAdvanced",
  ancestorBasic: "ancestorBasic",
  autocompleteAncestor: "autocompleteAncestor",
  basic: "basic",
} as const;

type TreeSampleType = keyof typeof TreeSampleTypes;

const getTreeSample = (selectedExample: TreeSampleType) => {
  switch (selectedExample) {
    case TreeSampleTypes.basic:
      return basicExample;
    case TreeSampleTypes.ancestorBasic:
      return ancestorBasicExample;
    case TreeSampleTypes.ancestorAdvanced:
      return ancestorAdvancedExample;
    case TreeSampleTypes.autocompleteAncestor:
      return autocompleteExampleWithAncestor;
    default:
      return basicExample;
  }
};

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
  onSubmit,
  submitData,
  dialogOpen,
  customHeaders,
  isSubmitting,
  handleCloseDialog,
  handleChangeComponent,
}: SandboxProps) => {
  const [value, setValue] = useState(0);
  const [selectedExample, setSelectedExample] = useState<TreeSampleType>(TreeSampleTypes.basic);
  const [treeData, setTreeData] = useState(() => structuredClone(basicExample));

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TreegeConsumerProvider adapterLocale="fr">
      <ThemeProvider theme="dark">
        <Grid2 container height="100%">
          <Grid2
            size={6}
            sx={{
              display: "flex",
              maxHeight: "100%",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            <TextareaAutosize
              minRows={10}
              value={JSON.stringify(treeData, null, 2)}
              style={{
                background: "black",
                color: "green",
                height: "100%",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            />
          </Grid2>
          <Grid2
            size={6}
            sx={{
              height: "100%",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            <Stack spacing={2} pt={4}>
              <Grid2 container direction="row" spacing={2} alignItems="center" justifyContent="center" alignContent="center">
                <Grid2 size={5} alignContent="center" justifyContent="center" display="flex">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label">Example</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedExample}
                      onChange={(e) => {
                        const selectedValue = e.target.value as TreeSampleType;
                        setSelectedExample(selectedValue);

                        const newTree = getTreeSample(selectedValue);
                        setTreeData(newTree);
                      }}
                    >
                      <MenuItem value={TreeSampleTypes.basic}>Basic</MenuItem>
                      <MenuItem value={TreeSampleTypes.ancestorBasic}>ancestor basic</MenuItem>
                      <MenuItem value={TreeSampleTypes.autocompleteAncestor}>autocomplete with ancestor</MenuItem>
                      <MenuItem value={TreeSampleTypes.ancestorAdvanced}>ancestor advanced with API calls</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={4} alignContent="center" justifyContent="flex-end" display="flex">
                  <Button variant="link" onClick={() => handleChangeComponent("DataViewer")}>
                    See values
                  </Button>
                </Grid2>
              </Grid2>

              <Box flex={1} pt={2}>
                <TreegeConsumer
                  key={treeData.uuid}
                  debug
                  tree={treeData}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  headers={customHeaders}
                  options={{
                    disablePastDatePicker: true,
                    disablePastDateRangePicker: true,
                    googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
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
                      <Tab label="DetailFieldValues" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
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
                  <CustomTabPanel value={value} index={3}>
                    <pre>{JSON.stringify(submitData?.detailFieldValues, null, 2)}</pre>
                  </CustomTabPanel>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Grid2>
        </Grid2>
      </ThemeProvider>
    </TreegeConsumerProvider>
  );
};

export default Sandbox;
