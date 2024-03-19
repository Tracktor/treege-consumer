const basicExample = {
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

export default basicExample;
