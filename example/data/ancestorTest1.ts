import type { TreeNode } from "@tracktor/types-treege";

const ancestorTest1: TreeNode = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "articleType",
    name: "articleType",
    type: "select",
    values: [
      {
        id: "0",
        label: "machine",
        value: "machine",
      },
      {
        id: "1",
        label: "option",
        value: "option",
      },
    ],
  },
  children: [
    {
      attributes: {
        depth: 1,
        initialQuery: true,
        isLeaf: true,
        label: "article",
        name: "article",
        route: {
          params: [
            {
              id: "1",
              key: "onlyParents",
              staticValue: "true",
            },
            {
              ancestorUuid: "17498930680273x47jom17647.5",
              id: "2",
              key: "articleType[]",
              useAncestorValue: true,
            },
          ],
          pathKey: {
            label: "name",
            value: "id",
          },
          searchKey: "text",
          url: "https://app.api.dev.tracktor.fr/v2/search/articles",
        },
        type: "autocomplete",
      },
      children: [],
      uuid: "174989310346130ewjw553082",
    },
  ],
  uuid: "17498930680273x47jom17647.5",
};

export default ancestorTest1;
