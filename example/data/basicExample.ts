import TreeNode from "@/types/TreeNode";

const basicExample: TreeNode = {
  attributes: {
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "Time",
    name: "time",
    type: "time",
  },
  children: [
    {
      attributes: {
        depth: 1,
        isLeaf: false,
        label: "Time Range",
        name: "timeRange",
        type: "timeRange",
      },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "Date",
            name: "date",
            type: "date",
          },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: true,
                label: "Date Range",
                name: "dateRange",
                type: "dateRange",
              },
              children: [],
              uuid: ":r2h:",
            },
          ],
          uuid: ":r25:",
        },
      ],
      uuid: ":r1q:",
    },
  ],
  uuid: ":r1f:",
};

export default basicExample;
