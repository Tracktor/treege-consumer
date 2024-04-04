const basicValuesConsumerExample = [
  {
    label: "À quelle phase de votre projet êtes-vous ?",
    name: "phase",
    type: "select",
    value: {
      label: "J'ai un besoin pour un projet en cours ou à venir",
      value: "in_progress",
    },
  },
  {
    label: "Ma date de début est flexible (+/- 1 jour)",
    name: "flexible",
    type: "checkbox",
    value: true,
  },
  {
    label: "Quantité",
    name: "quantity",
    type: "number",
    value: "1",
  },
  {
    label: "Avec Livraison & Reprise",
    name: "with_delivery",
    type: "switch",
    value: true,
  },
  {
    label: "Location avec opérateur",
    name: "location",
    type: "radio",
    value: {
      label: "Oui",
      value: "yes",
    },
  },
  {
    label: "BRH",
    name: "brh",
    type: "switch",
    value: true,
  },
  {
    label: "Benne Preneuse",
    name: "benne_preneuse",
    type: "switch",
    value: true,
  },
];

export default basicValuesConsumerExample;
