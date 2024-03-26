import type TreeNode from "@/types/TreeNode";

type Mock = { restFieldsArray?: TreeNode["childrenTreeRest"]; output: TreeNode[] };

const simpleRestFieldsArray: Mock = {
  output: [{ attributes: { depth: 2, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
  restFieldsArray: [
    {
      currentTree: {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "Tree",
          tree: {
            attributes: {
              depth: 0,
              isRoot: true,
              label: "Username",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 1,
                  isLeaf: false,
                  isRoot: false,
                  label: "otherTree",
                  tree: {
                    attributes: {
                      depth: 0,
                      isLeaf: false,
                      isRoot: true,
                      label: "Test",
                      type: "text",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 1,
                          isDecision: true,
                          isLeaf: false,
                          label: "newdecision",
                          type: "select",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: true,
                              label: "v1",
                              value: "v1",
                            },
                            children: [],
                            name: "newdecision:v1",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v2",
                              value: "v2",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v2 de larbre le plus profond",
                                  type: "text",
                                },
                                children: [],
                                name: "v2 de larbre le plus profond",
                              },
                            ],
                            name: "newdecision:v2",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v3",
                              value: "v3",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v3 de larbre le plus profond",
                                  type: "text",
                                },
                                children: [],
                                name: "v3 de larbre le plus profond",
                              },
                            ],
                            name: "newdecision:v3",
                          },
                        ],
                        name: "newdecision",
                      },
                    ],
                    name: "Homme",
                    treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
                  },
                  treePath: "/Tree/otherTree",
                  type: "tree",
                },
                children: [
                  {
                    attributes: {
                      depth: 2,
                      isDecision: true,
                      isLeaf: false,
                      isRoot: false,
                      label: "Decision",
                      type: "select",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          label: "v1",
                          value: "v1",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v1Field",
                              type: "text",
                            },
                            children: [],
                            name: "v1Field",
                          },
                        ],
                        name: "Decision:v1",
                      },
                      {
                        attributes: {
                          depth: 3,
                          label: "v2",
                          value: "v2",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v2Field",
                              type: "text",
                            },
                            children: [],
                            name: "v2Field",
                          },
                        ],
                        name: "Decision:v2",
                      },
                    ],
                    name: "Decision",
                  },
                ],
                name: "otherTree",
              },
            ],
            name: "username",
            treeId: "41042a08-4660-4609-af32-784bbd0503cf",
          },
          treePath: "/Tree",
          type: "tree",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: true,
              label: "Final",
              type: "text",
            },
            children: [],
            name: "Final",
          },
        ],
        name: "Tree",
      },
    },
  ],
};

const restFieldsArrayWithDecision: Mock = {
  output: [
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "Decision", type: "select" },
      children: [
        {
          attributes: { depth: 3, label: "v1", value: "v1" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "v1Field", type: "text" }, children: [], name: "v1Field" }],
          name: "Decision:v1",
        },
        {
          attributes: { depth: 3, label: "v2", value: "v2" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "v2Field", type: "text" }, children: [], name: "v2Field" }],
          name: "Decision:v2",
        },
      ],
      childrenTreeRest: [
        {
          currentTree: {
            attributes: {
              depth: 1,
              isLeaf: false,
              isRoot: false,
              label: "Tree",
              tree: {
                attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                children: [
                  {
                    attributes: {
                      depth: 1,
                      isLeaf: false,
                      isRoot: false,
                      label: "otherTree",
                      tree: {
                        attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", type: "text" },
                        children: [
                          {
                            attributes: { depth: 1, isDecision: true, isLeaf: false, label: "newdecision", type: "select" },
                            children: [
                              { attributes: { depth: 2, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "newdecision:v1" },
                              {
                                attributes: { depth: 2, isLeaf: false, label: "v2", value: "v2" },
                                children: [
                                  {
                                    attributes: { depth: 3, isLeaf: true, label: "v2 de larbre le plus profond", type: "text" },
                                    children: [],
                                    name: "v2 de larbre le plus profond",
                                  },
                                ],
                                name: "newdecision:v2",
                              },
                              {
                                attributes: { depth: 2, isLeaf: false, label: "v3", value: "v3" },
                                children: [
                                  {
                                    attributes: { depth: 3, isLeaf: true, label: "v3 de larbre le plus profond", type: "text" },
                                    children: [],
                                    name: "v3 de larbre le plus profond",
                                  },
                                ],
                                name: "newdecision:v3",
                              },
                            ],
                            name: "newdecision",
                          },
                        ],
                        name: "Homme",
                        treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
                      },
                      treePath: "/Tree/otherTree",
                      type: "tree",
                    },
                    children: [
                      {
                        attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "Decision", type: "select" },
                        children: [
                          {
                            attributes: { depth: 3, label: "v1", value: "v1" },
                            children: [
                              { attributes: { depth: 4, isLeaf: true, label: "v1Field", type: "text" }, children: [], name: "v1Field" },
                            ],
                            name: "Decision:v1",
                          },
                          {
                            attributes: { depth: 3, label: "v2", value: "v2" },
                            children: [
                              { attributes: { depth: 4, isLeaf: true, label: "v2Field", type: "text" }, children: [], name: "v2Field" },
                            ],
                            name: "Decision:v2",
                          },
                        ],
                        name: "Decision",
                      },
                    ],
                    name: "otherTree",
                  },
                ],
                name: "username",
                treeId: "41042a08-4660-4609-af32-784bbd0503cf",
              },
              treePath: "/Tree",
              type: "tree",
            },
            children: [{ attributes: { depth: 2, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
            name: "Tree",
          },
        },
      ],
      name: "Tree.Decision",
      treePath: "/Tree",
    },
  ],
  restFieldsArray: [
    {
      currentTree: {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "otherTree",
          tree: {
            attributes: {
              depth: 0,
              isLeaf: false,
              isRoot: true,
              label: "Test",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 1,
                  isDecision: true,
                  isLeaf: false,
                  label: "newdecision",
                  type: "select",
                },
                children: [
                  {
                    attributes: {
                      depth: 2,
                      isLeaf: true,
                      label: "v1",
                      value: "v1",
                    },
                    children: [],
                    name: "newdecision:v1",
                  },
                  {
                    attributes: {
                      depth: 2,
                      isLeaf: false,
                      label: "v2",
                      value: "v2",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v2 de larbre le plus profond",
                          type: "text",
                        },
                        children: [],
                        name: "v2 de larbre le plus profond",
                      },
                    ],
                    name: "newdecision:v2",
                  },
                  {
                    attributes: {
                      depth: 2,
                      isLeaf: false,
                      label: "v3",
                      value: "v3",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v3 de larbre le plus profond",
                          type: "text",
                        },
                        children: [],
                        name: "v3 de larbre le plus profond",
                      },
                    ],
                    name: "newdecision:v3",
                  },
                ],
                name: "newdecision",
              },
            ],
            name: "Homme",
            treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
          },
          treePath: "/Tree/otherTree",
          type: "tree",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isDecision: true,
              isLeaf: false,
              isRoot: false,
              label: "Decision",
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  label: "v1",
                  value: "v1",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v1Field",
                      type: "text",
                    },
                    children: [],
                    name: "v1Field",
                  },
                ],
                name: "Decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  label: "v2",
                  value: "v2",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v2Field",
                      type: "text",
                    },
                    children: [],
                    name: "v2Field",
                  },
                ],
                name: "Decision:v2",
              },
            ],
            name: "Decision",
          },
        ],
        name: "otherTree",
      },
      treePath: "/Tree",
    },
    {
      currentTree: {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "Tree",
          tree: {
            attributes: {
              depth: 0,
              isRoot: true,
              label: "Username",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 1,
                  isLeaf: false,
                  isRoot: false,
                  label: "otherTree",
                  tree: {
                    attributes: {
                      depth: 0,
                      isLeaf: false,
                      isRoot: true,
                      label: "Test",
                      type: "text",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 1,
                          isDecision: true,
                          isLeaf: false,
                          label: "newdecision",
                          type: "select",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: true,
                              label: "v1",
                              value: "v1",
                            },
                            children: [],
                            name: "newdecision:v1",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v2",
                              value: "v2",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v2 de larbre le plus profond",
                                  type: "text",
                                },
                                children: [],
                                name: "v2 de larbre le plus profond",
                              },
                            ],
                            name: "newdecision:v2",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v3",
                              value: "v3",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v3 de larbre le plus profond",
                                  type: "text",
                                },
                                children: [],
                                name: "v3 de larbre le plus profond",
                              },
                            ],
                            name: "newdecision:v3",
                          },
                        ],
                        name: "newdecision",
                      },
                    ],
                    name: "Homme",
                    treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
                  },
                  treePath: "/Tree/otherTree",
                  type: "tree",
                },
                children: [
                  {
                    attributes: {
                      depth: 2,
                      isDecision: true,
                      isLeaf: false,
                      isRoot: false,
                      label: "Decision",
                      type: "select",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          label: "v1",
                          value: "v1",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v1Field",
                              type: "text",
                            },
                            children: [],
                            name: "v1Field",
                          },
                        ],
                        name: "Decision:v1",
                      },
                      {
                        attributes: {
                          depth: 3,
                          label: "v2",
                          value: "v2",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v2Field",
                              type: "text",
                            },
                            children: [],
                            name: "v2Field",
                          },
                        ],
                        name: "Decision:v2",
                      },
                    ],
                    name: "Decision",
                  },
                ],
                name: "otherTree",
              },
            ],
            name: "username",
            treeId: "41042a08-4660-4609-af32-784bbd0503cf",
          },
          treePath: "/Tree",
          type: "tree",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: true,
              label: "Final",
              type: "text",
            },
            children: [],
            name: "Final",
          },
        ],
        name: "Tree",
      },
    },
  ],
};

export { simpleRestFieldsArray, restFieldsArrayWithDecision };
