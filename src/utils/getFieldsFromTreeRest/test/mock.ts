import type TreeNode from "@/types/TreeNode";

type Mock = { restFieldsArray?: TreeNode["childrenTreeRest"]; output: TreeNode[] };

const simpleRestFieldsArray: Mock = {
  output: [{ attributes: { depth: 2, isLeaf: true, label: "Final", name: "final", type: "text" }, children: [], uuid: "Final" }],
  restFieldsArray: [
    {
      currentTree: {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "Tree",
          name: "tree",
          tree: {
            attributes: {
              depth: 0,
              isRoot: true,
              label: "Username",
              name: "username",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 1,
                  isLeaf: false,
                  isRoot: false,
                  label: "otherTree",
                  name: "otherTree",
                  tree: {
                    attributes: {
                      depth: 0,
                      isLeaf: false,
                      isRoot: true,
                      label: "Test",
                      name: "test",
                      type: "text",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 1,
                          isDecision: true,
                          isLeaf: false,
                          label: "newdecision",
                          name: "newdecision",
                          type: "select",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: true,
                              label: "v1",
                              name: "v1",
                              value: "v1",
                            },
                            children: [],
                            uuid: "newdecision:v1",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v2",
                              name: "v2",
                              value: "v2",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v2 de larbre le plus profond",
                                  name: "newdecision:v2",
                                  type: "text",
                                },
                                children: [],
                                uuid: "v2 de larbre le plus profond",
                              },
                            ],
                            uuid: "newdecision:v2",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v3",
                              name: "v3",
                              value: "v3",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v3 de larbre le plus profond",
                                  name: "newdecision:v3",
                                  type: "text",
                                },
                                children: [],
                                uuid: "v3 de larbre le plus profond",
                              },
                            ],
                            uuid: "newdecision:v3",
                          },
                        ],
                        uuid: "newdecision",
                      },
                    ],
                    treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
                    uuid: "Homme",
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
                      name: "Decision",
                      type: "select",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          label: "v1",
                          name: "v1",
                          value: "v1",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v1Field",
                              name: "v1Field",
                              type: "text",
                            },
                            children: [],
                            uuid: "v1Field",
                          },
                        ],
                        uuid: "Decision:v1",
                      },
                      {
                        attributes: {
                          depth: 3,
                          label: "v2",
                          name: "v2",
                          value: "v2",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v2Field",
                              name: "v2Field",
                              type: "text",
                            },
                            children: [],
                            uuid: "v2Field",
                          },
                        ],
                        uuid: "Decision:v2",
                      },
                    ],
                    uuid: "Decision",
                  },
                ],
                uuid: "otherTree",
              },
            ],
            treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            uuid: "username",
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
              name: "final",
              type: "text",
            },
            children: [],
            uuid: "Final",
          },
        ],
        uuid: "Tree",
      },
    },
  ],
};

const restFieldsArrayWithDecision: Mock = {
  output: [
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "Decision", name: "Decision", type: "select" },
      children: [
        {
          attributes: { depth: 3, label: "v1", name: "v1", value: "v1" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "v1Field", name: "v1Field", type: "text" }, children: [], uuid: "v1Field" },
          ],
          uuid: "Decision:v1",
        },
        {
          attributes: { depth: 3, label: "v2", name: "v2", value: "v2" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "v2Field", name: "v2Field", type: "text" }, children: [], uuid: "v2Field" },
          ],
          uuid: "Decision:v2",
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
              name: "tree",
              tree: {
                attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                children: [
                  {
                    attributes: {
                      depth: 1,
                      isLeaf: false,
                      isRoot: false,
                      label: "otherTree",
                      name: "otherTree",
                      tree: {
                        attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "test", type: "text" },
                        children: [
                          {
                            attributes: {
                              depth: 1,
                              isDecision: true,
                              isLeaf: false,
                              label: "newdecision",
                              name: "newdecision",
                              type: "select",
                            },
                            children: [
                              {
                                attributes: { depth: 2, isLeaf: true, label: "v1", name: "v1", value: "v1" },
                                children: [],
                                uuid: "newdecision:v1",
                              },
                              {
                                attributes: { depth: 2, isLeaf: false, label: "v2", name: "v2", value: "v2" },
                                children: [
                                  {
                                    attributes: {
                                      depth: 3,
                                      isLeaf: true,
                                      label: "v2 de larbre le plus profond",
                                      name: "newdecision:v2",
                                      type: "text",
                                    },
                                    children: [],
                                    uuid: "v2 de larbre le plus profond",
                                  },
                                ],
                                uuid: "newdecision:v2",
                              },
                              {
                                attributes: { depth: 2, isLeaf: false, label: "v3", name: "v3", value: "v3" },
                                children: [
                                  {
                                    attributes: {
                                      depth: 3,
                                      isLeaf: true,
                                      label: "v3 de larbre le plus profond",
                                      name: "newdecision:v3",
                                      type: "text",
                                    },
                                    children: [],
                                    uuid: "v3 de larbre le plus profond",
                                  },
                                ],
                                uuid: "newdecision:v3",
                              },
                            ],
                            uuid: "newdecision",
                          },
                        ],
                        treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
                        uuid: "Homme",
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
                          name: "Decision",
                          type: "select",
                        },
                        children: [
                          {
                            attributes: { depth: 3, label: "v1", name: "v1", value: "v1" },
                            children: [
                              {
                                attributes: { depth: 4, isLeaf: true, label: "v1Field", name: "v1Field", type: "text" },
                                children: [],
                                uuid: "v1Field",
                              },
                            ],
                            uuid: "Decision:v1",
                          },
                          {
                            attributes: { depth: 3, label: "v2", name: "v2", value: "v2" },
                            children: [
                              {
                                attributes: { depth: 4, isLeaf: true, label: "v2Field", name: "v2Field", type: "text" },
                                children: [],
                                uuid: "v2Field",
                              },
                            ],
                            uuid: "Decision:v2",
                          },
                        ],
                        uuid: "Decision",
                      },
                    ],
                    uuid: "otherTree",
                  },
                ],
                treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                uuid: "username",
              },
              treePath: "/Tree",
              type: "tree",
            },
            children: [
              { attributes: { depth: 2, isLeaf: true, label: "Final", name: "final", type: "text" }, children: [], uuid: "Final" },
            ],
            uuid: "Tree",
          },
        },
      ],
      treePath: "/Tree",
      uuid: "Decision",
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
          name: "otherTree",
          tree: {
            attributes: {
              depth: 0,
              isLeaf: false,
              isRoot: true,
              label: "Test",
              name: "test",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 1,
                  isDecision: true,
                  isLeaf: false,
                  label: "newdecision",
                  name: "newdecision",
                  type: "select",
                },
                children: [
                  {
                    attributes: {
                      depth: 2,
                      isLeaf: true,
                      label: "v1",
                      name: "v1",
                      value: "v1",
                    },
                    children: [],
                    uuid: "newdecision:v1",
                  },
                  {
                    attributes: {
                      depth: 2,
                      isLeaf: false,
                      label: "v2",
                      name: "v2",
                      value: "v2",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v2 de larbre le plus profond",
                          name: "newdecision:v2",
                          type: "text",
                        },
                        children: [],
                        uuid: "v2 de larbre le plus profond",
                      },
                    ],
                    uuid: "newdecision:v2",
                  },
                  {
                    attributes: {
                      depth: 2,
                      isLeaf: false,
                      label: "v3",
                      name: "v3",
                      value: "v3",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v3 de larbre le plus profond",
                          name: "newdecision:v3",
                          type: "text",
                        },
                        children: [],
                        uuid: "v3 de larbre le plus profond",
                      },
                    ],
                    uuid: "newdecision:v3",
                  },
                ],
                uuid: "newdecision",
              },
            ],
            treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
            uuid: "Homme",
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
              name: "Decision",
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  label: "v1",
                  name: "v1",
                  value: "v1",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v1Field",
                      name: "v1Field",
                      type: "text",
                    },
                    children: [],
                    uuid: "v1Field",
                  },
                ],
                uuid: "Decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  label: "v2",
                  name: "v2",
                  value: "v2",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v2Field",
                      name: "v2Field",
                      type: "text",
                    },
                    children: [],
                    uuid: "v2Field",
                  },
                ],
                uuid: "Decision:v2",
              },
            ],
            uuid: "Decision",
          },
        ],
        uuid: "otherTree",
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
          name: "tree",
          tree: {
            attributes: {
              depth: 0,
              isRoot: true,
              label: "Username",
              name: "username",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 1,
                  isLeaf: false,
                  isRoot: false,
                  label: "otherTree",
                  name: "otherTree",
                  tree: {
                    attributes: {
                      depth: 0,
                      isLeaf: false,
                      isRoot: true,
                      label: "Test",
                      name: "test",
                      type: "text",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 1,
                          isDecision: true,
                          isLeaf: false,
                          label: "newdecision",
                          name: "newdecision",
                          type: "select",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: true,
                              label: "v1",
                              name: "v1",
                              value: "v1",
                            },
                            children: [],
                            uuid: "newdecision:v1",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v2",
                              name: "v2",
                              value: "v2",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v2 de larbre le plus profond",
                                  name: "newdecision:v2",
                                  type: "text",
                                },
                                children: [],
                                uuid: "v2 de larbre le plus profond",
                              },
                            ],
                            uuid: "newdecision:v2",
                          },
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "v3",
                              name: "v3",
                              value: "v3",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "v3 de larbre le plus profond",
                                  name: "newdecision:v3",
                                  type: "text",
                                },
                                children: [],
                                uuid: "v3 de larbre le plus profond",
                              },
                            ],
                            uuid: "newdecision:v3",
                          },
                        ],
                        uuid: "newdecision",
                      },
                    ],
                    treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
                    uuid: "Homme",
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
                      name: "Decision",
                      type: "select",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          label: "v1",
                          name: "v1",
                          value: "v1",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v1Field",
                              name: "v1Field",
                              type: "text",
                            },
                            children: [],
                            uuid: "v1Field",
                          },
                        ],
                        uuid: "Decision:v1",
                      },
                      {
                        attributes: {
                          depth: 3,
                          label: "v2",
                          name: "v2",
                          value: "v2",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 4,
                              isLeaf: true,
                              label: "v2Field",
                              name: "v2Field",
                              type: "text",
                            },
                            children: [],
                            uuid: "v2Field",
                          },
                        ],
                        uuid: "Decision:v2",
                      },
                    ],
                    uuid: "Decision",
                  },
                ],
                uuid: "otherTree",
              },
            ],
            treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            uuid: "username",
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
              name: "final",
              type: "text",
            },
            children: [],
            uuid: "Final",
          },
        ],
        uuid: "Tree",
      },
    },
  ],
};

export { simpleRestFieldsArray, restFieldsArrayWithDecision };
