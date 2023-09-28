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
} from "@tracktor/design-system";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import TreegeConsumer, { TreegeConsumerProps } from "@/features/TreegeConsumer";
import type { TreeNode } from "@/types/TreeNode";

const data = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "Select",
    type: "select",
    values: [
      {
        id: "0",
        label: "a",
        value: "a",
      },
      {
        id: "1",
        label: "b",
        value: "b",
      },
      {
        id: "2",
        label: "c",
        value: "c",
      },
      {
        id: "3",
        label: "d",
        value: "d",
      },
    ],
  },
  children: [
    {
      attributes: {
        depth: 1,
        isDecision: true,
        isLeaf: false,
        isRoot: false,
        label: "Select 2",
        type: "select",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "A",
            value: "a",
          },
          children: [],
          name: "select_2:a",
        },
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "B",
            value: "b",
          },
          children: [],
          name: "select_2:b",
        },
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "C",
            value: "c",
          },
          children: [],
          name: "select_2:c",
        },
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "D",
            value: "d",
          },
          children: [],
          name: "select_2:d",
        },
      ],
      name: "select_2",
    },
  ],
  name: "select",
};

const App = () => {
  const [tree, setTree] = useState<TreeNode>(data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("stepper");
  const [formData, setFormData] = useState<[string, FormDataEntryValue][]>();

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleChangeVariant = useCallback((_: MouseEvent<HTMLElement>, newAlignment: TreegeConsumerProps["variant"]) => {
    setVariant(newAlignment);
  }, []);

  const handleChangeTree = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setTree(JSON.parse(value));
  }, []);

  const handleSubmit = useCallback((submitData: [string, FormDataEntryValue][]) => {
    setFormData(submitData);
    setDialogOpen(true);
  }, []);

  return (
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
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
          <Box display="flex" justifyContent="center" padding={5}>
            <ToggleButtonGroup value={variant} size="small" onChange={handleChangeVariant} exclusive>
              <ToggleButton value="stepper">Stepper</ToggleButton>
              <ToggleButton value="standard">Standard</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box flex={1}>
            <TreegeConsumer
              tree={data}
              variant={variant}
              onSubmit={handleSubmit}
              options={{ googleApiKey: "AIzaSyCEE2sZpLEpujo22Liix8ZizOYiqYQkWTc" }}
              initialValues={{
                address: "17ème Arrondissement, Paris, France",
                quantity: 1,
              }}
            />
          </Box>
        </Box>
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
