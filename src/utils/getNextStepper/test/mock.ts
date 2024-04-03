import type TreeNode from "@/types/TreeNode";

type Mock = { fields?: TreeNode[]; output: number };

const emptyFields: Mock = {
  fields: [],
  output: 0,
};

const fieldsWithNextFieldNoHidden: Mock = {
  fields: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Username", name: "Username", type: "text" },
      children: [
        {
          attributes: { depth: 1, hiddenValue: "2", isLeaf: true, label: "hidden", name: "hidden", type: "hidden" },
          children: [],
          uuid: "hidden",
        },
      ],
      uuid: "username",
    },
    {
      attributes: { depth: 1, hiddenValue: "2", isLeaf: true, label: "hidden", name: "hidden", type: "hidden" },
      children: [],
      uuid: "hidden",
    },
  ],
  output: 0,
};

const fieldsWithNextFieldHidden: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        hiddenValue: "fist hidden",
        isLeaf: false,
        isRoot: true,
        label: "firstHidden",
        name: "firstHidden",
        type: "hidden",
      },
      children: [
        { attributes: { depth: 1, isLeaf: true, label: "Username", name: "Username", type: "text" }, children: [], uuid: "username" },
      ],
      uuid: "firstHidden",
    },
    { attributes: { depth: 1, isLeaf: true, label: "Username", name: "Username", type: "text" }, children: [], uuid: "username" },
  ],
  output: 1,
};

const fieldsWithTwoNextFieldHidden: Mock = {
  fields: [
    {
      attributes: {
        depth: 0,
        hiddenValue: "fist hidden",
        isLeaf: false,
        isRoot: true,
        label: "firstHidden",
        name: "firstHidden",
        type: "hidden",
      },
      children: [
        {
          attributes: { depth: 1, hiddenValue: "2", isLeaf: false, label: "hidden", name: "hidden", type: "hidden" },
          children: [
            { attributes: { depth: 2, isLeaf: true, label: "Username", name: "Username", type: "text" }, children: [], uuid: "username" },
          ],
          uuid: "hidden",
        },
      ],
      uuid: "firstHidden",
    },
    {
      attributes: { depth: 1, hiddenValue: "2", isLeaf: false, label: "hidden", name: "hidden", type: "hidden" },
      children: [
        { attributes: { depth: 2, isLeaf: true, label: "Username", name: "Username", type: "text" }, children: [], uuid: "username" },
      ],
      uuid: "hidden",
    },
    { attributes: { depth: 2, isLeaf: true, label: "Username", name: "Username", type: "text" }, children: [], uuid: "username" },
  ],
  output: 2,
};

const fieldsWithMultipleHiddenAndNextHidden: Mock = {
  fields: [
    {
      attributes: { depth: 0, hiddenValue: "hidden1", isLeaf: false, isRoot: true, label: "hidden1", name: "hidden1", type: "hidden" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Username", name: "Username", type: "text" },
          children: [
            {
              attributes: { depth: 2, hiddenValue: "hidden2", isLeaf: false, label: "hidden2", name: "hidden2", type: "hidden" },
              children: [
                {
                  attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", name: "hidden3", type: "hidden" },
                  children: [
                    {
                      attributes: { depth: 4, isLeaf: true, label: "Password", name: "Password", type: "text" },
                      children: [],
                      uuid: "password",
                    },
                  ],
                  uuid: "hidden3",
                },
              ],
              uuid: "hidden2",
            },
          ],
          uuid: "username",
        },
      ],
      uuid: "hidden1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Username", name: "Username", type: "text" },
      children: [
        {
          attributes: { depth: 2, hiddenValue: "hidden2", isLeaf: false, label: "hidden2", name: "hidden2", type: "hidden" },
          children: [
            {
              attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", name: "hidden3", type: "hidden" },
              children: [
                {
                  attributes: { depth: 4, isLeaf: true, label: "Password", name: "Password", type: "text" },
                  children: [],
                  uuid: "password",
                },
              ],
              uuid: "hidden3",
            },
          ],
          uuid: "hidden2",
        },
      ],
      uuid: "username",
    },
    {
      attributes: { depth: 2, hiddenValue: "hidden2", isLeaf: false, label: "hidden2", name: "hidden2", type: "hidden" },
      children: [
        {
          attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", name: "hidden3", type: "hidden" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "Password", name: "Password", type: "text" }, children: [], uuid: "password" },
          ],
          uuid: "hidden3",
        },
      ],
      uuid: "hidden2",
    },
    {
      attributes: { depth: 3, hiddenValue: "hidden3", isLeaf: false, label: "hidden3", name: "hidden3", type: "hidden" },
      children: [
        { attributes: { depth: 4, isLeaf: true, label: "Password", name: "Password", type: "text" }, children: [], uuid: "password" },
      ],
      uuid: "hidden3",
    },
    { attributes: { depth: 4, isLeaf: true, label: "Password", name: "Password", type: "text" }, children: [], uuid: "password" },
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
