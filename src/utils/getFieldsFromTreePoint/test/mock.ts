import type TreeNode from "@/types/TreeNode";

type Mock = { tree: TreeNode; output: TreeNode[] };

const simpleTreeMock: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
          children: [{ attributes: { depth: 2, isLeaf: true, label: "3", name: "3", type: "text" }, children: [], uuid: "3" }],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
      children: [{ attributes: { depth: 2, isLeaf: true, label: "3", name: "3", type: "text" }, children: [], uuid: "3" }],
      uuid: "2",
    },
    { attributes: { depth: 2, isLeaf: true, label: "3", name: "3", type: "text" }, children: [], uuid: "3" },
  ],
  tree: {
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
};

const treeWithTreeMock: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "tree",
                    name: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                      children: [
                        {
                          attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                          children: [],
                          uuid: "password",
                        },
                      ],
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                      uuid: "username",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [],
                  uuid: "tree",
                },
              ],
              uuid: "3",
            },
          ],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: true,
                label: "tree",
                name: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                  children: [
                    {
                      attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                      children: [],
                      uuid: "password",
                    },
                  ],
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                  uuid: "username",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [],
              uuid: "tree",
            },
          ],
          uuid: "3",
        },
      ],
      uuid: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: true,
            label: "tree",
            name: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                  children: [],
                  uuid: "password",
                },
              ],
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
              uuid: "username",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [],
          uuid: "tree",
        },
      ],
      uuid: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "tree.username", type: "text" },
      children: [
        { attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" }, children: [], uuid: "password" },
      ],
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
      uuid: "username",
    },
    {
      attributes: { depth: 1, isLeaf: true, label: "Password", name: "tree.password", type: "text" },
      children: [],
      treePath: "/tree",
      uuid: "password",
    },
  ],
  tree: {
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
              isLeaf: false,
              label: "3",
              name: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: true,
                  label: "tree",
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
                          isLeaf: true,
                          label: "Password",
                          name: "password",
                          type: "text",
                        },
                        children: [],
                        uuid: "password",
                      },
                    ],
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    uuid: "username",
                  },
                  treePath: "/tree",
                  type: "tree",
                },
                children: [],
                uuid: "tree",
              },
            ],
            uuid: "3",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
};

const treeWithTreeAndChildrenInMainTreeMock: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "tree",
                    name: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                      children: [
                        {
                          attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                          children: [],
                          uuid: "password",
                        },
                      ],
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                      uuid: "username",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [
                    { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
                  ],
                  uuid: "tree",
                },
              ],
              uuid: "3",
            },
          ],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "tree",
                name: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                  children: [
                    {
                      attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                      children: [],
                      uuid: "password",
                    },
                  ],
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                  uuid: "username",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [
                { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
              ],
              uuid: "tree",
            },
          ],
          uuid: "3",
        },
      ],
      uuid: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "tree",
            name: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                  children: [],
                  uuid: "password",
                },
              ],
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
              uuid: "username",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" }],
          uuid: "tree",
        },
      ],
      uuid: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "tree.username", type: "text" },
      children: [
        { attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" }, children: [], uuid: "password" },
      ],
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
      uuid: "username",
    },
    {
      attributes: { depth: 1, isLeaf: true, label: "Password", name: "tree.password", type: "text" },
      children: [],
      treePath: "/tree",
      uuid: "password",
    },
    { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
  ],
  tree: {
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
              isLeaf: false,
              label: "3",
              name: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "tree",
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
                          isLeaf: true,
                          label: "Password",
                          name: "password",
                          type: "text",
                        },
                        children: [],
                        uuid: "password",
                      },
                    ],
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    uuid: "username",
                  },
                  treePath: "/tree",
                  type: "tree",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "Final",
                      name: "Final",
                      type: "text",
                    },
                    children: [],
                    uuid: "Final",
                  },
                ],
                uuid: "tree",
              },
            ],
            uuid: "3",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
};

const treeWithManyTreeChildren: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "tree",
                    name: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                      children: [
                        {
                          attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                          children: [
                            {
                              attributes: {
                                depth: 2,
                                isLeaf: false,
                                label: "tree2",
                                name: "tree2",
                                tree: {
                                  attributes: {
                                    depth: 0,
                                    isLeaf: true,
                                    isRoot: true,
                                    label: "fieldTree2",
                                    name: "fieldTree2",
                                    type: "text",
                                  },
                                  children: [],
                                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                                  uuid: "fieldTree2",
                                },
                                treePath: "/tree/tree2",
                                type: "tree",
                              },
                              children: [
                                {
                                  attributes: { depth: 3, isLeaf: true, label: "finalTree", name: "finalTree", type: "text" },
                                  children: [],
                                  uuid: "finalTree",
                                },
                              ],
                              uuid: "tree2",
                            },
                          ],
                          uuid: "password",
                        },
                      ],
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                      uuid: "username",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [
                    { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
                  ],
                  uuid: "tree",
                },
              ],
              uuid: "3",
            },
          ],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "tree",
                name: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                  children: [
                    {
                      attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                      children: [
                        {
                          attributes: {
                            depth: 2,
                            isLeaf: false,
                            label: "tree2",
                            name: "tree2",
                            tree: {
                              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
                              children: [],
                              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                              uuid: "fieldTree2",
                            },
                            treePath: "/tree/tree2",
                            type: "tree",
                          },
                          children: [
                            {
                              attributes: { depth: 3, isLeaf: true, label: "finalTree", name: "finalTree", type: "text" },
                              children: [],
                              uuid: "finalTree",
                            },
                          ],
                          uuid: "tree2",
                        },
                      ],
                      uuid: "password",
                    },
                  ],
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                  uuid: "username",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [
                { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
              ],
              uuid: "tree",
            },
          ],
          uuid: "3",
        },
      ],
      uuid: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "tree",
            name: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                  children: [
                    {
                      attributes: {
                        depth: 2,
                        isLeaf: false,
                        label: "tree2",
                        name: "tree2",
                        tree: {
                          attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
                          children: [],
                          treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                          uuid: "fieldTree2",
                        },
                        treePath: "/tree/tree2",
                        type: "tree",
                      },
                      children: [
                        {
                          attributes: { depth: 3, isLeaf: true, label: "finalTree", name: "finalTree", type: "text" },
                          children: [],
                          uuid: "finalTree",
                        },
                      ],
                      uuid: "tree2",
                    },
                  ],
                  uuid: "password",
                },
              ],
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
              uuid: "username",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" }],
          uuid: "tree",
        },
      ],
      uuid: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "tree.username", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "tree2",
                name: "tree2",
                tree: {
                  attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
                  children: [],
                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                  uuid: "fieldTree2",
                },
                treePath: "/tree/tree2",
                type: "tree",
              },
              children: [
                {
                  attributes: { depth: 3, isLeaf: true, label: "finalTree", name: "finalTree", type: "text" },
                  children: [],
                  uuid: "finalTree",
                },
              ],
              uuid: "tree2",
            },
          ],
          uuid: "password",
        },
      ],
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
      uuid: "username",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Password", name: "tree.password", type: "text" },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "tree2",
            name: "tree2",
            tree: {
              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
              children: [],
              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
              uuid: "fieldTree2",
            },
            treePath: "/tree/tree2",
            type: "tree",
          },
          children: [
            {
              attributes: { depth: 3, isLeaf: true, label: "finalTree", name: "finalTree", type: "text" },
              children: [],
              uuid: "finalTree",
            },
          ],
          uuid: "tree2",
        },
      ],
      treePath: "/tree",
      uuid: "password",
    },
    {
      attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "tree.tree2.fieldTree2", type: "text" },
      children: [],
      treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
      treePath: "/tree/tree2",
      uuid: "fieldTree2",
    },
    {
      attributes: { depth: 3, isLeaf: true, label: "finalTree", name: "tree.finalTree", type: "text" },
      children: [],
      treePath: "/tree",
      uuid: "finalTree",
    },
    { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
  ],
  tree: {
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
              isLeaf: false,
              label: "3",
              name: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "tree",
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
                          label: "Password",
                          name: "password",
                          type: "text",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "tree2",
                              name: "tree2",
                              tree: {
                                attributes: {
                                  depth: 0,
                                  isLeaf: true,
                                  isRoot: true,
                                  label: "fieldTree2",
                                  name: "fieldTree2",
                                  type: "text",
                                },
                                children: [],
                                treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                                uuid: "fieldTree2",
                              },
                              treePath: "/tree/tree2",
                              type: "tree",
                            },
                            children: [
                              {
                                attributes: {
                                  depth: 3,
                                  isLeaf: true,
                                  label: "finalTree",
                                  name: "finalTree",
                                  type: "text",
                                },
                                children: [],
                                uuid: "finalTree",
                              },
                            ],
                            uuid: "tree2",
                          },
                        ],
                        uuid: "password",
                      },
                    ],
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    uuid: "username",
                  },
                  treePath: "/tree",
                  type: "tree",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "Final",
                      name: "Final",
                      type: "text",
                    },
                    children: [],
                    uuid: "Final",
                  },
                ],
                uuid: "tree",
              },
            ],
            uuid: "3",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
};

const treeWithManyTreeChildrenWithoutOne: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "tree",
                    name: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                      children: [
                        {
                          attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                          children: [
                            {
                              attributes: {
                                depth: 2,
                                isLeaf: true,
                                label: "tree2",
                                name: "tree2",
                                tree: {
                                  attributes: {
                                    depth: 0,
                                    isLeaf: true,
                                    isRoot: true,
                                    label: "fieldTree2",
                                    name: "fieldTree2",
                                    type: "text",
                                  },
                                  children: [],
                                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                                  uuid: "fieldTree2",
                                },
                                treePath: "/tree/tree2",
                                type: "tree",
                              },
                              children: [],
                              uuid: "tree2",
                            },
                          ],
                          uuid: "password",
                        },
                      ],
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                      uuid: "username",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [
                    { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
                  ],
                  uuid: "tree",
                },
              ],
              uuid: "3",
            },
          ],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", name: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "tree",
                name: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
                  children: [
                    {
                      attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                      children: [
                        {
                          attributes: {
                            depth: 2,
                            isLeaf: true,
                            label: "tree2",
                            name: "tree2",
                            tree: {
                              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
                              children: [],
                              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                              uuid: "fieldTree2",
                            },
                            treePath: "/tree/tree2",
                            type: "tree",
                          },
                          children: [],
                          uuid: "tree2",
                        },
                      ],
                      uuid: "password",
                    },
                  ],
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                  uuid: "username",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [
                { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
              ],
              uuid: "tree",
            },
          ],
          uuid: "3",
        },
      ],
      uuid: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", name: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "tree",
            name: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", name: "username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                  children: [
                    {
                      attributes: {
                        depth: 2,
                        isLeaf: true,
                        label: "tree2",
                        name: "tree2",
                        tree: {
                          attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
                          children: [],
                          treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                          uuid: "fieldTree2",
                        },
                        treePath: "/tree/tree2",
                        type: "tree",
                      },
                      children: [],
                      uuid: "tree2",
                    },
                  ],
                  uuid: "password",
                },
              ],
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
              uuid: "username",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" }],
          uuid: "tree",
        },
      ],
      uuid: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "tree.username", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "tree2",
                name: "tree2",
                tree: {
                  attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
                  children: [],
                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                  uuid: "fieldTree2",
                },
                treePath: "/tree/tree2",
                type: "tree",
              },
              children: [],
              uuid: "tree2",
            },
          ],
          uuid: "password",
        },
      ],
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
      uuid: "username",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Password", name: "tree.password", type: "text" },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "tree2",
            name: "tree2",
            tree: {
              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "fieldTree2", type: "text" },
              children: [],
              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
              uuid: "fieldTree2",
            },
            treePath: "/tree/tree2",
            type: "tree",
          },
          children: [],
          uuid: "tree2",
        },
      ],
      treePath: "/tree",
      uuid: "password",
    },
    {
      attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", name: "tree.tree2.fieldTree2", type: "text" },
      children: [],
      treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
      treePath: "/tree/tree2",
      uuid: "fieldTree2",
    },
    { attributes: { depth: 4, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
  ],
  tree: {
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
              isLeaf: false,
              label: "3",
              name: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "tree",
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
                          label: "Password",
                          name: "password",
                          type: "text",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: true,
                              label: "tree2",
                              name: "tree2",
                              tree: {
                                attributes: {
                                  depth: 0,
                                  isLeaf: true,
                                  isRoot: true,
                                  label: "fieldTree2",
                                  name: "fieldTree2",
                                  type: "text",
                                },
                                children: [],
                                treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                                uuid: "fieldTree2",
                              },
                              treePath: "/tree/tree2",
                              type: "tree",
                            },
                            children: [],
                            uuid: "tree2",
                          },
                        ],
                        uuid: "password",
                      },
                    ],
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    uuid: "username",
                  },
                  treePath: "/tree",
                  type: "tree",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "Final",
                      name: "Final",
                      type: "text",
                    },
                    children: [],
                    uuid: "Final",
                  },
                ],
                uuid: "tree",
              },
            ],
            uuid: "3",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
};

const treeWithDecisionWithoutChildren: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "select" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", name: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
              children: [
                { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
                { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
              ],
              uuid: "decision",
            },
          ],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", name: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
          children: [
            { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
            { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
          ],
          uuid: "decision",
        },
      ],
      uuid: "2",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
      children: [
        { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
        { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
      ],
      uuid: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      name: "1",
      type: "select",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "2",
          name: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isDecision: true,
              isLeaf: false,
              isRoot: false,
              label: "decision",
              name: "decision",
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: true,
                  label: "v1",
                  name: "v1",
                  value: "v1",
                },
                children: [],
                uuid: "decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  isLeaf: true,
                  label: "v2",
                  name: "v2",
                  value: "v2",
                },
                children: [],
                uuid: "decision:v2",
              },
            ],
            uuid: "decision",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
};

const treeWithDecisionAndChildrens: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "select" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", name: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
              children: [
                {
                  attributes: { depth: 3, isLeaf: false, label: "v1", name: "v1", value: "v1" },
                  children: [
                    {
                      attributes: { depth: 4, isLeaf: true, label: "v1child", name: "v1child", type: "text" },
                      children: [],
                      uuid: "v1child",
                    },
                  ],
                  uuid: "decision:v1",
                },
                {
                  attributes: { depth: 3, isLeaf: false, label: "v2", name: "v2", value: "v2" },
                  children: [
                    {
                      attributes: { depth: 4, isLeaf: true, label: "v2child", name: "v2child", type: "text" },
                      children: [],
                      uuid: "v2child",
                    },
                  ],
                  uuid: "decision:v2",
                },
              ],
              uuid: "decision",
            },
          ],
          uuid: "2",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", name: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
          children: [
            {
              attributes: { depth: 3, isLeaf: false, label: "v1", name: "v1", value: "v1" },
              children: [
                { attributes: { depth: 4, isLeaf: true, label: "v1child", name: "v1child", type: "text" }, children: [], uuid: "v1child" },
              ],
              uuid: "decision:v1",
            },
            {
              attributes: { depth: 3, isLeaf: false, label: "v2", name: "v2", value: "v2" },
              children: [
                { attributes: { depth: 4, isLeaf: true, label: "v2child", name: "v2child", type: "text" }, children: [], uuid: "v2child" },
              ],
              uuid: "decision:v2",
            },
          ],
          uuid: "decision",
        },
      ],
      uuid: "2",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
      children: [
        {
          attributes: { depth: 3, isLeaf: false, label: "v1", name: "v1", value: "v1" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "v1child", name: "v1child", type: "text" }, children: [], uuid: "v1child" },
          ],
          uuid: "decision:v1",
        },
        {
          attributes: { depth: 3, isLeaf: false, label: "v2", name: "v2", value: "v2" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "v2child", name: "v2child", type: "text" }, children: [], uuid: "v2child" },
          ],
          uuid: "decision:v2",
        },
      ],
      uuid: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      name: "1",
      type: "select",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "2",
          name: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isDecision: true,
              isLeaf: false,
              isRoot: false,
              label: "decision",
              name: "decision",
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v1",
                  name: "v1",
                  value: "v1",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v1child",
                      name: "v1child",
                      type: "text",
                    },
                    children: [],
                    uuid: "v1child",
                  },
                ],
                uuid: "decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v2",
                  name: "v2",
                  value: "v2",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v2child",
                      name: "v2child",
                      type: "text",
                    },
                    children: [],
                    uuid: "v2child",
                  },
                ],
                uuid: "decision:v2",
              },
            ],
            uuid: "decision",
          },
        ],
        uuid: "2",
      },
    ],
    uuid: "1",
  },
};

const treeWithDecisionAndTree: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "select" },
      children: [
        {
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
                  attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" },
                  children: [],
                  uuid: "password",
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
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
              children: [
                {
                  attributes: { depth: 3, isLeaf: false, label: "v1", name: "v1", value: "v1" },
                  children: [
                    {
                      attributes: { depth: 4, isLeaf: true, label: "v1child", name: "v1child", type: "text" },
                      children: [],
                      uuid: "v1child",
                    },
                  ],
                  uuid: "decision:v1",
                },
                {
                  attributes: { depth: 3, isLeaf: false, label: "v2", name: "v2", value: "v2" },
                  children: [
                    {
                      attributes: { depth: 4, isLeaf: true, label: "v2child", name: "v2child", type: "text" },
                      children: [],
                      uuid: "v2child",
                    },
                  ],
                  uuid: "decision:v2",
                },
              ],
              uuid: "decision",
            },
          ],
          uuid: "Tree",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "Tree.username", type: "text" },
      children: [
        { attributes: { depth: 1, isLeaf: true, label: "Password", name: "password", type: "text" }, children: [], uuid: "password" },
      ],
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/Tree",
      uuid: "username",
    },
    {
      attributes: { depth: 1, isLeaf: true, label: "Password", name: "Tree.password", type: "text" },
      children: [],
      treePath: "/Tree",
      uuid: "password",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", name: "decision", type: "select" },
      children: [
        {
          attributes: { depth: 3, isLeaf: false, label: "v1", name: "v1", value: "v1" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "v1child", name: "v1child", type: "text" }, children: [], uuid: "v1child" },
          ],
          uuid: "decision:v1",
        },
        {
          attributes: { depth: 3, isLeaf: false, label: "v2", name: "v2", value: "v2" },
          children: [
            { attributes: { depth: 4, isLeaf: true, label: "v2child", name: "v2child", type: "text" }, children: [], uuid: "v2child" },
          ],
          uuid: "decision:v2",
        },
      ],
      uuid: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      name: "1",
      type: "select",
    },
    children: [
      {
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
                  isLeaf: true,
                  label: "Password",
                  name: "password",
                  type: "text",
                },
                children: [],
                uuid: "password",
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
              isDecision: true,
              isLeaf: false,
              isRoot: false,
              label: "decision",
              name: "decision",
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v1",
                  name: "v1",
                  value: "v1",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v1child",
                      name: "v1child",
                      type: "text",
                    },
                    children: [],
                    uuid: "v1child",
                  },
                ],
                uuid: "decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v2",
                  name: "v2",
                  value: "v2",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v2child",
                      name: "v2child",
                      type: "text",
                    },
                    children: [],
                    uuid: "v2child",
                  },
                ],
                uuid: "decision:v2",
              },
            ],
            uuid: "decision",
          },
        ],
        uuid: "Tree",
      },
    ],
    uuid: "1",
  },
};

const treeWithChildrenAndDecisionInTree: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "select" },
      children: [
        {
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
                  attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                  children: [
                    {
                      attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", name: "decision", type: "select" },
                      children: [
                        { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
                        { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
                      ],
                      uuid: "decision",
                    },
                  ],
                  uuid: "password",
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
              attributes: { depth: 2, isLeaf: true, isRoot: false, label: "Final", name: "Final", type: "text" },
              children: [],
              uuid: "Final",
            },
          ],
          uuid: "Tree",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "Tree.username", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", name: "decision", type: "select" },
              children: [
                { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
                { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
              ],
              uuid: "decision",
            },
          ],
          uuid: "password",
        },
      ],
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/Tree",
      uuid: "username",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Password", name: "Tree.password", type: "text" },
      children: [
        {
          attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", name: "decision", type: "select" },
          children: [
            { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
            { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
          ],
          uuid: "decision",
        },
      ],
      treePath: "/Tree",
      uuid: "password",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", name: "Tree.decision", type: "select" },
      children: [
        { attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "decision:v1" },
        { attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" }, children: [], uuid: "decision:v2" },
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
                    attributes: { depth: 1, isLeaf: false, label: "Password", name: "password", type: "text" },
                    children: [
                      {
                        attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", name: "decision", type: "select" },
                        children: [
                          {
                            attributes: { depth: 3, isLeaf: true, label: "v1", name: "v1", value: "v1" },
                            children: [],
                            uuid: "decision:v1",
                          },
                          {
                            attributes: { depth: 3, isLeaf: true, label: "v2", name: "v2", value: "v2" },
                            children: [],
                            uuid: "decision:v2",
                          },
                        ],
                        uuid: "decision",
                      },
                    ],
                    uuid: "password",
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
                attributes: { depth: 2, isLeaf: true, isRoot: false, label: "Final", name: "Final", type: "text" },
                children: [],
                uuid: "Final",
              },
            ],
            uuid: "Tree",
          },
        },
      ],
      treePath: "/Tree",
      uuid: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      name: "1",
      type: "select",
    },
    children: [
      {
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
                  label: "Password",
                  name: "password",
                  type: "text",
                },
                children: [
                  {
                    attributes: {
                      depth: 2,
                      isDecision: true,
                      isLeaf: false,
                      label: "decision",
                      name: "decision",
                      type: "select",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v1",
                          name: "v1",
                          value: "v1",
                        },
                        children: [],
                        uuid: "decision:v1",
                      },
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v2",
                          name: "v2",
                          value: "v2",
                        },
                        children: [],
                        uuid: "decision:v2",
                      },
                    ],
                    uuid: "decision",
                  },
                ],
                uuid: "password",
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
              isRoot: false,
              label: "Final",
              name: "Final",
              type: "text",
            },
            children: [],
            uuid: "Final",
          },
        ],
        uuid: "Tree",
      },
    ],
    uuid: "1",
  },
};

const complexeTreeWithDecision: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", name: "1", type: "text" },
      children: [
        {
          attributes: { depth: 4, isLeaf: true, label: "v2Field", name: "v2Field", type: "text" },
          children: [
            {
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
                          attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "Test", type: "text" },
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
                { attributes: { depth: 2, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
              ],
              uuid: "Tree",
            },
          ],
          uuid: "test celuila",
        },
      ],
      uuid: "1",
    },
    {
      attributes: { depth: 4, isLeaf: true, label: "v2Field", name: "v2Field", type: "text" },
      children: [
        {
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
                      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "Test", type: "text" },
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
          children: [{ attributes: { depth: 2, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" }],
          uuid: "Tree",
        },
      ],
      uuid: "test celuila",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", name: "Tree.username", type: "text" },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            isRoot: false,
            label: "otherTree",
            name: "otherTree",
            tree: {
              attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "Test", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isDecision: true, isLeaf: false, label: "newdecision", name: "newdecision", type: "select" },
                  children: [
                    { attributes: { depth: 2, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "newdecision:v1" },
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
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "Decision", name: "Decision", type: "select" },
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
      treePath: "/Tree",
      uuid: "username",
    },
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "Tree.otherTree.Test", type: "text" },
      children: [
        {
          attributes: { depth: 1, isDecision: true, isLeaf: false, label: "newdecision", name: "newdecision", type: "select" },
          children: [
            { attributes: { depth: 2, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "newdecision:v1" },
            {
              attributes: { depth: 2, isLeaf: false, label: "v2", name: "v2", value: "v2" },
              children: [
                {
                  attributes: { depth: 3, isLeaf: true, label: "v2 de larbre le plus profond", name: "newdecision:v2", type: "text" },
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
                  attributes: { depth: 3, isLeaf: true, label: "v3 de larbre le plus profond", name: "newdecision:v3", type: "text" },
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
      treePath: "/Tree/otherTree",
      uuid: "Homme",
    },
    {
      attributes: { depth: 1, isDecision: true, isLeaf: false, label: "newdecision", name: "Tree.otherTree.newdecision", type: "select" },
      children: [
        { attributes: { depth: 2, isLeaf: true, label: "v1", name: "v1", value: "v1" }, children: [], uuid: "newdecision:v1" },
        {
          attributes: { depth: 2, isLeaf: false, label: "v2", name: "v2", value: "v2" },
          children: [
            {
              attributes: { depth: 3, isLeaf: true, label: "v2 de larbre le plus profond", name: "newdecision:v2", type: "text" },
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
              attributes: { depth: 3, isLeaf: true, label: "v3 de larbre le plus profond", name: "newdecision:v3", type: "text" },
              children: [],
              uuid: "v3 de larbre le plus profond",
            },
          ],
          uuid: "newdecision:v3",
        },
      ],
      childrenTreeRest: [
        {
          currentTree: {
            attributes: {
              depth: 1,
              isLeaf: false,
              isRoot: false,
              label: "otherTree",
              name: "otherTree",
              tree: {
                attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "Test", type: "text" },
                children: [
                  {
                    attributes: { depth: 1, isDecision: true, isLeaf: false, label: "newdecision", name: "newdecision", type: "select" },
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
                        attributes: { depth: 0, isLeaf: false, isRoot: true, label: "Test", name: "Test", type: "text" },
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
              { attributes: { depth: 2, isLeaf: true, label: "Final", name: "Final", type: "text" }, children: [], uuid: "Final" },
            ],
            uuid: "Tree",
          },
        },
      ],
      treePath: "/Tree/otherTree",
      uuid: "newdecision",
    },
  ],
  tree: {
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
          depth: 4,
          isLeaf: true,
          label: "v2Field",
          name: "v2Field",
          type: "text",
        },
        children: [
          {
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
                          name: "Test",
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
                  name: "Final",
                  type: "text",
                },
                children: [],
                uuid: "Final",
              },
            ],
            uuid: "Tree",
          },
        ],
        uuid: "test celuila",
      },
    ],
    uuid: "1",
  },
};

export {
  simpleTreeMock,
  treeWithTreeMock,
  treeWithTreeAndChildrenInMainTreeMock,
  treeWithManyTreeChildren,
  treeWithManyTreeChildrenWithoutOne,
  treeWithDecisionWithoutChildren,
  treeWithDecisionAndChildrens,
  treeWithDecisionAndTree,
  treeWithChildrenAndDecisionInTree,
  complexeTreeWithDecision,
};
