import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextareaAutosize,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
} from "@tracktor/design-system";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import TreegeConsumer, { TreegeConsumerProps } from "@/features/TreegeConsumer";
import TreegeValuesConsumer from "@/features/TreegeValuesConsumer";
import type { TreeNode } from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/getJsonFormValue/getJsonFormValue";

const data = {
  attributes: {
    depth: 0,
    isLeaf: true,
    isRoot: true,
    label: "Article",
    required: true,
    route: {
      searchKey: "text",
      url: "https://ops.api.dev.tracktor.fr/v2/search/articles",
    },
    type: "autocomplete",
  },
  children: [],
  name: "article",
};

const App = () => {
  const [tree, setTree] = useState<TreeNode>(data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("stepper");
  const [formData, setFormData] = useState<JsonFormValue[]>();
  const [component, setComponent] = useState<"TreegeValuesConsumer" | "TreegeConsumer">("TreegeConsumer");

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

  const handleSubmit = useCallback((submitData: JsonFormValue[]) => {
    setFormData(submitData);
    setDialogOpen(true);
  }, []);

  if (component === "TreegeValuesConsumer") {
    return (
      <ThemeProvider>
        <Container>
          <Stack alignItems="center" p={3}>
            <Button variant="link" onClick={() => setComponent("TreegeConsumer")}>
              See TreegeConsumer
            </Button>
          </Stack>
          <TreegeValuesConsumer
            values={[
              {
                label: "Catégorie",
                name: "category",
                tag: "category",
                type: "select",
                value: {
                  label: "Lorem ipsum",
                  value: "delivery",
                },
              },
              {
                label: "Type d'incident",
                name: "delivery_reason",
                tag: "reason",
                type: "select",
                value: {
                  label: "Livraison -Retard sup 1h30 max 3h00",
                  value: "delay_in_delivery",
                },
              },
              {
                label: "Responsabilité",
                name: "delivery_responsibility",
                tag: "responsible",
                type: "select",
                value: {
                  label: "Fournisseur",
                  value: "supplier",
                },
              },
            ]}
          />
        </Container>
      </ThemeProvider>
    );
  }

  return (
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
            <Button variant="link" onClick={() => setComponent("TreegeValuesConsumer")}>
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
              <TreegeConsumer tree={data} variant={variant} onSubmit={handleSubmit} options={{ googleApiKey: "YOUR_SECRET_KEY" }} />
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
    </ThemeProvider>
  );
};
export default App;
