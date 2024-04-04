const basicJsonValues = [
  {
    label: "Recherchez un équipement",
    name: "article",
    type: "autocomplete",
    value: {
      id: "4341",
      image: null,
      label: "Mini grue araignée URW 295 8,8m 2,9T",
      options: [
        {
          articleName: "Prise en main",
          id: "620",
          image: null,
          isIncluded: false,
        },
        {
          articleName: "Operateur",
          id: "1035",
          image: null,
          isIncluded: false,
        },
      ],
    },
  },
  {
    label: "Ajoutez des options",
    name: "options",
    type: "dynamicSelect",
    value: [
      {
        id: "620",
        label: "Prise en main",
        value: "620",
      },
      {
        id: "1035",
        label: "Operateur",
        value: "1035",
      },
    ],
  },
  {
    name: "dateLocation",
    type: "dateRange",
    value: ["2024-04-11", "2024-04-30"],
  },
  {
    label: "Utiliser le samedi",
    name: "useOnSaturday",
    type: "checkbox",
    value: true,
  },
  {
    label: "Sélectionnez votre chantier",
    name: "worksite",
    type: "autocomplete",
    value: {
      id: "5",
      label: "Aéroport Roissy",
      options: "5",
    },
  },
  {
    label: "Heures de livraison",
    name: "hoursConstraints",
    type: "timeRange",
    value: ["11:38", "12:39"],
  },
  {
    label: "Contraintes d'accès",
    name: "siteConstraints",
    type: "text",
    value: "Contrainte",
  },
  {
    label: "Point de dépôt",
    name: "dropOffDescription",
    type: "text",
    value: "Point",
  },

  {
    label: "Ajoutez des contacts sur site",
    name: "worksiteContacts",
    type: "dynamicSelect",
    value: {
      id: "8",
      label: "nanard@gmail.com",
      value: "8",
    },
  },
];
export default basicJsonValues;
