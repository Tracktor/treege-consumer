import type { TreeNode } from "@tracktor/types-treege";

const basicExample: TreeNode = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "a",
    name: "a",
    type: "text",
  },
  children: [
    {
      attributes: {
        defaultValueFromAncestor: {
          inputObjectKey: "1234",
          name: "a",
          outputModel: "string",
          uuid: "1747748561685va8xp781105.7000000476837",
        },
        depth: 1,
        isLeaf: false,
        label: "b",
        name: "b",
        type: "text",
      },
      children: [
        {
          attributes: {
            defaultValueFromAncestor: {
              inputObjectKey: "",
              name: "a",
              outputModel: "boolean",
              uuid: "1747748576475dhhwd2015895.100000023842",
            },
            depth: 2,
            isLeaf: true,
            label: "c",
            name: "c",
            type: "switch",
          },
          children: [],
          uuid: "1747748576475dhhwd2015895.100000023842",
        },
      ],
      uuid: "17477485669973a4yffm6417",
    },
  ],
  uuid: "1747748561685va8xp781105.7000000476837",
};

export default basicExample;
