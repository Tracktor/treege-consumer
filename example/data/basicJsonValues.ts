const basicJsonValues = [
  {
    label: "text",
    name: "text",
    type: "text",
    value: "Coucou",
  },
  {
    label: "select",
    name: "select",
    type: "select",
    value: {
      label: "1",
      value: "1",
    },
  },
  {
    label: "date",
    name: "date",
    type: "date",
    value: "2024-04-25",
  },
  {
    label: "radio",
    name: "radio",
    type: "radio",
    value: {
      label: "qw",
      value: "qw",
    },
  },
  {
    label: "switch",
    name: "switch",
    type: "switch",
    value: true,
  },
  {
    label: "timerange",
    name: "timerange",
    type: "timeRange",
    value: ["17:05", "19:06"],
  },
  {
    label: "daterange",
    name: "daterange",
    type: "dateRange",
    value: ["2024-03-21", "2024-03-31"],
  },
  {
    label: "adresse",
    name: "adresse",
    type: "address",
    value: "coucou",
  },
  {
    label: "time",
    name: "time",
    type: "time",
    value: "10:55",
  },
  {
    label: "hiddenField",
    name: "hiddenField",
    type: "hidden",
    value: "hidden",
  },
  {
    label: "autocomplete",
    name: "autocomplete",
    type: "autocomplete",
    value: {
      id: "4670",
      name: " Roulotte tôlée 6 places - 1 WC",
      options: "4670",
    },
  },
];
export default basicJsonValues;
