import type { TreeNode } from "@tracktor/types-treege";

const autocompleteTest: TreeNode = {
  attributes: {
    depth: 0,
    initialQuery: true,
    isLeaf: false,
    isRoot: true,
    label: "worksite",
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
        value: "id",
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
          sourceValue: "address",
          uuid: "17490464395187cqrfgz1142.6999998092651",
        },
        depth: 1,
        isLeaf: true,
        label: "adress",
        name: "adress",
        type: "address",
      },
      children: [],
      uuid: "1749046548312hmbkvvm109936.19999980927",
    },
  ],
  uuid: "17490464395187cqrfgz1142.6999998092651",
};

export default autocompleteTest;
