import type { TreeNode } from "@tracktor/types-treege";

const ancestorTest2: TreeNode = {
  attributes: {
    depth: 0,
    initialQuery: true,
    isLeaf: false,
    isRoot: true,
    label: "category",
    name: "category",
    route: {
      params: [
        {
          id: "1",
          key: "onlyParents",
          staticValue: "true",
        },
      ],
      pathKey: {
        label: "name",
        value: "id",
      },
      searchKey: "text",
      url: "https://app.api.dev.tracktor.fr/v2/search/categories",
    },
    type: "autocomplete",
  },
  children: [
    {
      attributes: {
        depth: 1,
        initialQuery: true,
        isLeaf: false,
        label: "subcategory",
        name: "subcategory",
        route: {
          params: [
            {
              ancestorUuid: "1750076275376dbcqjga9205.299999982119",
              id: "1",
              key: "parentIds[]",
              useAncestorValue: true,
            },
          ],
          pathKey: {
            label: "name",
            value: "id",
          },
          searchKey: "text",
          url: "https://app.api.dev.tracktor.fr/v2/search/categories",
        },
        type: "autocomplete",
      },
      children: [
        {
          attributes: {
            depth: 2,
            initialQuery: true,
            isLeaf: true,
            label: "article",
            name: "article",
            route: {
              params: [
                {
                  ancestorUuid: "175007633306415q7p6v66893.09999999404",
                  id: "1",
                  key: "category_id",
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
            type: "dynamicSelect",
          },
          children: [],
          uuid: "17500765510887x3e8rh284917.1999999881",
        },
      ],
      uuid: "175007633306415q7p6v66893.09999999404",
    },
  ],
  uuid: "1750076275376dbcqjga9205.299999982119",
};

export default ancestorTest2;
