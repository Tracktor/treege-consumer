import type TreeNode from "@/types/TreeNode";

type Mock = { fieldsArray?: TreeNode[]; treePath?: string; output: TreeNode[] };

const fieldArrayMock: TreeNode[] = [
  {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      name: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          name: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: true,
              label: "3",
              name: "3",
              type: "text",
            },
            children: [],
            uuid: "3",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
  {
    attributes: {
      depth: 1,
      isLeaf: false,
      label: "2",
      name: "2",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 2,
          isLeaf: true,
          label: "3",
          name: "3",
          type: "text",
        },
        children: [],
        uuid: "3",
      },
    ],
    uuid: "2",
  },
  {
    attributes: {
      depth: 2,
      isLeaf: true,
      label: "3",
      name: "3",
      type: "text",
    },
    children: [],
    uuid: "3",
  },
];

const fieldArrayOutputMock: TreeNode[] = [
  {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      name: "Contact.1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          name: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: true,
              label: "3",
              name: "3",
              type: "text",
            },
            children: [],
            uuid: "3",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
  {
    attributes: {
      depth: 1,
      isLeaf: false,
      label: "2",
      name: "Contact.2",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 2,
          isLeaf: true,
          label: "3",
          name: "3",
          type: "text",
        },
        children: [],
        uuid: "3",
      },
    ],
    uuid: "2",
  },
  {
    attributes: {
      depth: 2,
      isLeaf: true,
      label: "3",
      name: "Contact.3",
      type: "text",
    },
    children: [],
    uuid: "3",
  },
];

const fieldsArrayUndefined: Mock = { fieldsArray: undefined, output: [] };

const fieldsNameWithoutTreePath: Mock = { fieldsArray: fieldArrayMock, output: fieldArrayMock };

const fieldsNameWithTreePath: Mock = { fieldsArray: fieldArrayMock, output: fieldArrayOutputMock, treePath: "/Contact" };

export { fieldsNameWithoutTreePath, fieldsNameWithTreePath, fieldsArrayUndefined };
