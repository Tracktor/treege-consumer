const basicExample = {
  attributes: {
    depth: 0,
    isDecision: true,
    isLeaf: false,
    isRoot: true,
    label: "decision",
    type: "select",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "1",
        value: "1",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "text1",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: true,
                label: "f",
                type: "text",
              },
              children: [],
              name: "f",
            },
          ],
          name: "text1",
        },
      ],
      name: "decision:1",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "2",
        value: "2",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "text2",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: true,
                label: "f",
                type: "text",
              },
              children: [],
              name: "ff",
            },
          ],
          name: "text2",
        },
      ],
      name: "decision:2",
    },
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "3",
        value: "3",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "text3",
            type: "text",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: true,
                label: "f",
                type: "text",
              },
              children: [],
              name: "fff",
            },
          ],
          name: "text3",
        },
      ],
      name: "decision:3",
    },
  ],
  name: "decision",
};

export default basicExample;
