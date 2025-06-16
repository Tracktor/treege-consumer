import type { TreeNode } from "@tracktor/types-treege";

const ancestorTest3: TreeNode = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "worksiteId",
    name: "worksiteId",
    type: "text",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: true,
        label: "worksite",
        name: "worksite",
        route: {
          params: [
            {
              ancestorUuid: "17501009644814q8sp4d2382.4000000059605",
              id: "1",
              key: "{worksite_id}",
              useAncestorValue: true,
            },
          ],
          pathKey: {
            label: "name",
            value: "id",
          },
          url: "https://app.api.dev.tracktor.fr/v2/worksites/{worksite_id}",
        },
        type: "dynamicSelect",
      },
      children: [],
      uuid: "17501009767876x2gztu14688.90000000596",
    },
  ],
  uuid: "17501009644814q8sp4d2382.4000000059605",
};

export default ancestorTest3;
