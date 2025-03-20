import type { TreeNode } from "@tracktor/types-treege";

const basicExample: TreeNode = {
  attributes: {
    depth: 1,
    isLeaf: false,
    label: "À quelle phase de votre projet êtes-vous ?",
    name: "phase",
    required: true,
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
        name: "flexible",
        type: "checkbox",
      },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "Quantité",
            name: "quantity",
            type: "number",
          },
          children: [
            {
              attributes: {
                depth: 4,
                isLeaf: false,
                label: "Avec Livraison & Reprise",
                name: "with_delivery",
                type: "switch",
              },
              children: [
                {
                  attributes: {
                    depth: 5,
                    isDecision: true,
                    isLeaf: false,
                    label: "Location avec opérateur",
                    name: "location",
                    type: "radio",
                  },
                  children: [
                    {
                      attributes: {
                        depth: 6,
                        isLeaf: false,
                        label: "Oui",
                        name: "location:yes",
                        value: "yes",
                      },
                      children: [
                        {
                          attributes: {
                            depth: 7,
                            isLeaf: false,
                            label: " 3 godets",
                            name: "3 godets",
                            type: "switch",
                          },
                          children: [
                            {
                              attributes: {
                                depth: 8,
                                isLeaf: false,
                                label: "BRH",
                                name: "brh",
                                type: "switch",
                              },
                              children: [
                                {
                                  attributes: {
                                    depth: 9,
                                    isLeaf: false,
                                    label: "Benne Preneuse",
                                    name: "benne_preneuse",
                                    type: "switch",
                                  },
                                  children: [
                                    {
                                      attributes: {
                                        depth: 10,
                                        isLeaf: false,
                                        label: "Godet curage orientable",
                                        name: "godet_curage",
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
                                            name: "godet_orientable",
                                            type: "switch",
                                          },
                                          children: [
                                            {
                                              attributes: {
                                                depth: 12,
                                                isLeaf: false,
                                                label: "Pince de Tri",
                                                name: "pince_de_tri",
                                                type: "switch",
                                              },
                                              children: [
                                                {
                                                  attributes: {
                                                    depth: 13,
                                                    isLeaf: true,
                                                    label: "Tarière hydraulique",
                                                    name: "tariere_hydraulique",
                                                    type: "switch",
                                                  },
                                                  children: [],
                                                  uuid: ":l37x:",
                                                },
                                              ],
                                              uuid: ":l36x:",
                                            },
                                          ],
                                          uuid: ":l35x",
                                        },
                                      ],
                                      uuid: ":l34:x",
                                    },
                                  ],
                                  uuid: ":l33x:",
                                },
                              ],
                              uuid: ":l32x:",
                            },
                          ],
                          uuid: ":l31x:",
                        },
                      ],
                      uuid: ":l3x:",
                    },
                    {
                      attributes: {
                        depth: 6,
                        isLeaf: true,
                        label: "Non",
                        name: "location:no",
                        value: "no",
                      },
                      children: [],
                      uuid: ":l2x:",
                    },
                  ],
                  uuid: ":l1x:",
                },
              ],
              uuid: ":w1x:",
            },
          ],
          uuid: "1726493775404wjpmbdx32548.70000000298",
        },
      ],
      uuid: "1726474285157tkqourv30657.59999999404",
    },
  ],
  uuid: "1726474271061htc22oi16561.79999998212",
};

export default basicExample;
