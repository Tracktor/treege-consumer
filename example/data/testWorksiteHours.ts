import type { TreeNode } from "@tracktor/types-treege";

const testWorksiteHours: TreeNode = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "worksite",
    name: "worksite",
    type: "select",
    values: [
      {
        id: "0",
        label: "DIVERS CHANTIER - B09X.208689",
        value: "7376",
      },
    ],
  },
  children: [
    {
      attributes: {
        defaultValueFromAncestor: {
          uuid: "1750111362072v5cwq148814028.5",
        },
        depth: 1,
        isLeaf: false,
        label: "api worksite",
        name: "api worksite",
        route: {
          params: [
            {
              ancestorUuid: "1750111362072v5cwq148814028.5",
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
      children: [
        {
          attributes: {
            defaultValueFromAncestor: {
              sourceValue: "hourConstraints",
              uuid: "1750111409376oo9z1zj8861332.5",
            },
            depth: 2,
            isLeaf: true,
            label: "hours constraint",
            name: "hours_constraint",
            type: "timeRange",
          },
          children: [],
          uuid: "1750111564885agn7qos9016840.599999994",
        },
      ],
      uuid: "1750111409376oo9z1zj8861332.5",
    },
  ],
  uuid: "1750111362072v5cwq148814028.5",
};

export default testWorksiteHours;
