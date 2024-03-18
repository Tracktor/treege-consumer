import type TreeNode from "@/types/TreeNode";

type Mock = { fields?: TreeNode[]; output: number };

const emptyFields: Mock = {
  fields: [],
  output: 0,
};

const fieldsWithNextFieldNoHidden: Mock = {
  fields: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Username", type: "text" },
      children: [
        { attributes: { depth: 1, hiddenValue: "2", isLeaf: true, label: "hidden", type: "hidden" }, children: [], name: "hidden" },
      ],
      name: "username",
    },
    { attributes: { depth: 1, hiddenValue: "2", isLeaf: true, label: "hidden", type: "hidden" }, children: [], name: "hidden" },
  ],
  output: 0,
};

const fieldsWithNextFieldHidden: Mock = {
  fields: [
    {
      attributes: { depth: 0, hiddenValue: "fist hidden", isLeaf: false, isRoot: true, label: "firstHidden", type: "hidden" },
      children: [{ attributes: { depth: 1, isLeaf: true, label: "Username", type: "text" }, children: [], name: "username" }],
      name: "firstHidden",
    },
    { attributes: { depth: 1, isLeaf: true, label: "Username", type: "text" }, children: [], name: "username" },
  ],
  output: 1,
};

const fieldsWithTwoNextFieldHidden: Mock = {
  fields: [
    {
      attributes: { depth: 0, hiddenValue: "fist hidden", isLeaf: false, isRoot: true, label: "firstHidden", type: "hidden" },
      children: [
        {
          attributes: { depth: 1, hiddenValue: "2", isLeaf: false, label: "hidden", type: "hidden" },
          children: [{ attributes: { depth: 2, isLeaf: true, label: "Username", type: "text" }, children: [], name: "username" }],
          name: "hidden",
        },
      ],
      name: "firstHidden",
    },
    {
      attributes: { depth: 1, hiddenValue: "2", isLeaf: false, label: "hidden", type: "hidden" },
      children: [{ attributes: { depth: 2, isLeaf: true, label: "Username", type: "text" }, children: [], name: "username" }],
      name: "hidden",
    },
    { attributes: { depth: 2, isLeaf: true, label: "Username", type: "text" }, children: [], name: "username" },
  ],
  output: 2,
};

const fieldsWithMultipleHiddenAndNextHidden: Mock = {
  fields: [
    {
      attributes: { depth: 0, hiddenValue: "hidden1", isLeaf: false, isRoot: true, label: "hidden1", type: "hidden" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Username", type: "text" },
          children: [
            {
              attributes: { depth: 2, hiddenValue: "hidden2", isLeaf: false, label: "hidden2", type: "hidden" },
              children: [
                {
                  attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", type: "hidden" },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
                  name: "hidden3",
                },
              ],
              name: "hidden2",
            },
          ],
          name: "username",
        },
      ],
      name: "hidden1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Username", type: "text" },
      children: [
        {
          attributes: { depth: 2, hiddenValue: "hidden2", isLeaf: false, label: "hidden2", type: "hidden" },
          children: [
            {
              attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", type: "hidden" },
              children: [{ attributes: { depth: 4, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
              name: "hidden3",
            },
          ],
          name: "hidden2",
        },
      ],
      name: "username",
    },
    {
      attributes: { depth: 2, hiddenValue: "hidden2", isLeaf: false, label: "hidden2", type: "hidden" },
      children: [
        {
          attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", type: "hidden" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
          name: "hidden3",
        },
      ],
      name: "hidden2",
    },
    {
      attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", type: "hidden" },
      children: [{ attributes: { depth: 4, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
      name: "hidden3",
    },
    { attributes: { depth: 4, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" },
  ],
  output: 1,
};

export {
  emptyFields,
  fieldsWithNextFieldNoHidden,
  fieldsWithTwoNextFieldHidden,
  fieldsWithNextFieldHidden,
  fieldsWithMultipleHiddenAndNextHidden,
};
