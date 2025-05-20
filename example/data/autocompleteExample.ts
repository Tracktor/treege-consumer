import type { TreeNode } from "@tracktor/types-treege";

const autocompleteTest: TreeNode = {
  attributes: {
    depth: 0,
    initialQuery: true,
    isLeaf: false,
    isRoot: true,
    label: "Chantier",
    name: "worksite",
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
      url: "https://app.api.dev.tracktor.fr/v2/search/worksites",
    },
    type: "autocomplete",
  },
  children: [
    {
      attributes: {
        defaultValueFromAncestor: {
          inputObjectKey: "address",
          name: "worksite",
          outputModel: "address",
          uuid: "1747747424763oilhs2i54919.09999990463",
        },
        depth: 1,
        isLeaf: true,
        label: "adresse",
        name: "adresse",
        type: "address",
      },
      children: [],
      uuid: "1747747483554vegj2jr113709.5",
    },
  ],
  uuid: "1747747424763oilhs2i54919.09999990463",
};

export default autocompleteTest;
