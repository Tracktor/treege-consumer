import TreeNode from "@/types/TreeNode";

const basicExample: TreeNode = {
  attributes: {
    depth: 0,
    isDecision: true,
    label: "decision",
    name: "decision",
    type: "select",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "a",
        name: "decision:a",
        value: "a",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "a",
            name: "a",
            type: "text",
          },
          children: [],
          uuid: ":r37:",
        },
      ],
      uuid: ":r25::a",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "b",
        name: "decision:b",
        value: "b",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "b",
            name: "b",
            type: "text",
          },
          children: [],
          uuid: ":r2r:",
        },
      ],
      uuid: ":r25::b",
    },
  ],
  uuid: ":r25:",
};

export default basicExample;
