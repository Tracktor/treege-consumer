const AutocompleteTest = {
  attributes: {
    depth: 0,
    initialQuery: true,
    isLeaf: true,
    isRoot: true,
    label: "Sélection du nom du chantier",
    name: "worksite",
    required: true,
    route: {
      params: [
        {
          id: "1",
          key: "linked_to_user_only",
          value: "true",
        },
      ],
      pathKey: {
        label: "name",
      },
      searchKey: "text",
      url: "https://app.api.tracktor.fr/v2/search/worksites",
    },
    type: "autocomplete",
  },
  children: [],
  uuid: "1732545461565b6zcstb1351881.399999991",
};

export default AutocompleteTest;
