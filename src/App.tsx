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
    helperText: "Utiliser l'auto completion",
    isLeaf: false,
    isRoot: true,
    label: "Ville ou adresse du site",
    required: true,
    type: "address",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "À quelle phase de votre projet êtes-vous ?",
        type: "select",
        values: [
          {
            id: "0",
            label: "J'ai un besoin pour un projet en cours ou à venir",
            value: "in_progress",
          },
          {
            id: "1",
            label: "Je veux juste obtenir un prix",
            value: "price_only",
          },
        ],
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "Ma date de début est flexible (+/- 1 jour)",
            type: "checkbox",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "Quantité",
                type: "number",
              },
              children: [
                {
                  attributes: {
                    depth: 4,
                    isLeaf: false,
                    label: "Avec Livraison & Reprise",
                    type: "switch",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 5,
                        isDecision: true,
                        isLeaf: false,
                        label: "Location avec opérateur",
                        type: "radio",
                      },
                      children: [
                        {
                          attributes: {
                            depth: 6,
                            isLeaf: false,
                            label: "Oui",
                            value: "yes",
                          },
                          children: [
                            {
                              attributes: {
                                depth: 7,
                                isLeaf: false,
                                label: " 3 godets",
                                type: "switch",
                              },
                              children: [
                                {
                                  attributes: {
                                    depth: 8,
                                    isLeaf: false,
                                    label: "BRH",
                                    type: "switch",
                                  },
                                  children: [
                                    {
                                      attributes: {
                                        depth: 9,
                                        isLeaf: false,
                                        label: "Benne Preneuse",
                                        type: "switch",
                                      },
                                      children: [
                                        {
                                          attributes: {
                                            depth: 10,
                                            isLeaf: false,
                                            label: "Godet curage orientable",
                                            type: "switch",
                                          },
                                          children: [
                                            {
                                              attributes: {
                                                depth: 11,
                                                isLeaf: false,
                                                isRoot: false,
                                                label: "Godet orientable",
                                                messages: {
                                                  on: "Le prix du transport peut varier",
                                                },
                                                type: "switch",
                                              },
                                              children: [
                                                {
                                                  attributes: {
                                                    depth: 12,
                                                    isLeaf: false,
                                                    label: "Pince de Tri",
                                                    type: "switch",
                                                  },
                                                  children: [
                                                    {
                                                      attributes: {
                                                        depth: 13,
                                                        isLeaf: true,
                                                        label: "Tarière hydraulique",
                                                        type: "switch",
                                                      },
                                                      children: [],
                                                      name: "tariere_hydraulique",
                                                    },
                                                  ],
                                                  name: "pince_de_tri",
                                                },
                                              ],
                                              name: "godet_orientable",
                                            },
                                          ],
                                          name: "godet_curage",
                                        },
                                      ],
                                      name: "benne_preneuse",
                                    },
                                  ],
                                  name: "brh",
                                },
                              ],
                              name: " 3 godets",
                            },
                          ],
                          name: "location:yes",
                        },
                        {
                          attributes: {
                            depth: 6,
                            isLeaf: true,
                            label: "Non",
                            value: "no",
                          },
                          children: [],
                          name: "location:no",
                        },
                      ],
                      name: "location",
                    },
                  ],
                  name: "with_delivery",
                },
              ],
              name: "quantity",
            },
          ],
          name: "flexible",
        },
      ],
      name: "phase",
    },
  ],
  name: "address",
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
