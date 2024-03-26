const basicValuesConsumerExample = [
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
];

export default basicValuesConsumerExample;
