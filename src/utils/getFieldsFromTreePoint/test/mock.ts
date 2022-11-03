import type { TreeNode } from "@/types/TreeNode";

type Mock = { tree: TreeNode; output: TreeNode[] };

const simpleTreeMock: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
          children: [{ attributes: { depth: 2, isLeaf: true, label: "3", type: "text" }, children: [], name: "3" }],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
      children: [{ attributes: { depth: 2, isLeaf: true, label: "3", type: "text" }, children: [], name: "3" }],
      name: "2",
    },
    { attributes: { depth: 2, isLeaf: true, label: "3", type: "text" }, children: [], name: "3" },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: true,
              label: "3",
              type: "text",
            },
            children: [],
            name: "3",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithTreeMock: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: true,
                    label: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                      children: [
                        { attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" },
                      ],
                      name: "username",
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [],
                  name: "tree",
                },
              ],
              name: "3",
            },
          ],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: true,
                label: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                  children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
                  name: "username",
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [],
              name: "tree",
            },
          ],
          name: "3",
        },
      ],
      name: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: true,
            label: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
              children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
              name: "username",
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [],
          name: "tree",
        },
      ],
      name: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
      children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
      name: "tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
    },
    { attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "tree.password", treePath: "/tree" },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: false,
              label: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: true,
                  label: "tree",
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
                          isLeaf: true,
                          label: "Password",
                          type: "text",
                        },
                        children: [],
                        name: "password",
                      },
                    ],
                    name: "username",
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                  },
                  treePath: "/tree",
                  type: "tree",
                },
                children: [],
                name: "tree",
              },
            ],
            name: "3",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithTreeAndChildrenInMainTreeMock: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                      children: [
                        { attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" },
                      ],
                      name: "username",
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
                  name: "tree",
                },
              ],
              name: "3",
            },
          ],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                  children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
                  name: "username",
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
              name: "tree",
            },
          ],
          name: "3",
        },
      ],
      name: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
              children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
              name: "username",
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
          name: "tree",
        },
      ],
      name: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
      children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
      name: "tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
    },
    { attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "tree.password", treePath: "/tree" },
    { attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: false,
              label: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "tree",
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
                          isLeaf: true,
                          label: "Password",
                          type: "text",
                        },
                        children: [],
                        name: "password",
                      },
                    ],
                    name: "username",
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
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
                      type: "text",
                    },
                    children: [],
                    name: "Final",
                  },
                ],
                name: "tree",
              },
            ],
            name: "3",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithManyTreeChildren: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                      children: [
                        {
                          attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                          children: [
                            {
                              attributes: {
                                depth: 2,
                                isLeaf: false,
                                label: "tree2",
                                tree: {
                                  attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                                  children: [],
                                  name: "fieldTree2",
                                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                                },
                                treePath: "/tree/tree2",
                                type: "tree",
                              },
                              children: [
                                {
                                  attributes: { depth: 3, isLeaf: true, label: "finalTree", type: "text" },
                                  children: [],
                                  name: "finalTree",
                                },
                              ],
                              name: "tree2",
                            },
                          ],
                          name: "password",
                        },
                      ],
                      name: "username",
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
                  name: "tree",
                },
              ],
              name: "3",
            },
          ],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                  children: [
                    {
                      attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                      children: [
                        {
                          attributes: {
                            depth: 2,
                            isLeaf: false,
                            label: "tree2",
                            tree: {
                              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                              children: [],
                              name: "fieldTree2",
                              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                            },
                            treePath: "/tree/tree2",
                            type: "tree",
                          },
                          children: [
                            { attributes: { depth: 3, isLeaf: true, label: "finalTree", type: "text" }, children: [], name: "finalTree" },
                          ],
                          name: "tree2",
                        },
                      ],
                      name: "password",
                    },
                  ],
                  name: "username",
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
              name: "tree",
            },
          ],
          name: "3",
        },
      ],
      name: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                  children: [
                    {
                      attributes: {
                        depth: 2,
                        isLeaf: false,
                        label: "tree2",
                        tree: {
                          attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                          children: [],
                          name: "fieldTree2",
                          treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                        },
                        treePath: "/tree/tree2",
                        type: "tree",
                      },
                      children: [
                        { attributes: { depth: 3, isLeaf: true, label: "finalTree", type: "text" }, children: [], name: "finalTree" },
                      ],
                      name: "tree2",
                    },
                  ],
                  name: "password",
                },
              ],
              name: "username",
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
          name: "tree",
        },
      ],
      name: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: false,
                label: "tree2",
                tree: {
                  attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                  children: [],
                  name: "fieldTree2",
                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                },
                treePath: "/tree/tree2",
                type: "tree",
              },
              children: [{ attributes: { depth: 3, isLeaf: true, label: "finalTree", type: "text" }, children: [], name: "finalTree" }],
              name: "tree2",
            },
          ],
          name: "password",
        },
      ],
      name: "tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: false,
            label: "tree2",
            tree: {
              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
              children: [],
              name: "fieldTree2",
              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
            },
            treePath: "/tree/tree2",
            type: "tree",
          },
          children: [{ attributes: { depth: 3, isLeaf: true, label: "finalTree", type: "text" }, children: [], name: "finalTree" }],
          name: "tree2",
        },
      ],
      name: "tree.password",
      treePath: "/tree",
    },
    {
      attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
      children: [],
      name: "tree.tree2.fieldTree2",
      treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
      treePath: "/tree/tree2",
    },
    { attributes: { depth: 3, isLeaf: true, label: "finalTree", type: "text" }, children: [], name: "tree.finalTree", treePath: "/tree" },
    { attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: false,
              label: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "tree",
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
                          label: "Password",
                          type: "text",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: false,
                              label: "tree2",
                              tree: {
                                attributes: {
                                  depth: 0,
                                  isLeaf: true,
                                  isRoot: true,
                                  label: "fieldTree2",
                                  type: "text",
                                },
                                children: [],
                                name: "fieldTree2",
                                treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
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
                                  type: "text",
                                },
                                children: [],
                                name: "finalTree",
                              },
                            ],
                            name: "tree2",
                          },
                        ],
                        name: "password",
                      },
                    ],
                    name: "username",
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
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
                      type: "text",
                    },
                    children: [],
                    name: "Final",
                  },
                ],
                name: "tree",
              },
            ],
            name: "3",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithManyTreeChildrenWithoutOne: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
              children: [
                {
                  attributes: {
                    depth: 3,
                    isLeaf: false,
                    label: "tree",
                    tree: {
                      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                      children: [
                        {
                          attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                          children: [
                            {
                              attributes: {
                                depth: 2,
                                isLeaf: true,
                                label: "tree2",
                                tree: {
                                  attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                                  children: [],
                                  name: "fieldTree2",
                                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                                },
                                treePath: "/tree/tree2",
                                type: "tree",
                              },
                              children: [],
                              name: "tree2",
                            },
                          ],
                          name: "password",
                        },
                      ],
                      name: "username",
                      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                    },
                    treePath: "/tree",
                    type: "tree",
                  },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
                  name: "tree",
                },
              ],
              name: "3",
            },
          ],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
          children: [
            {
              attributes: {
                depth: 3,
                isLeaf: false,
                label: "tree",
                tree: {
                  attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
                  children: [
                    {
                      attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                      children: [
                        {
                          attributes: {
                            depth: 2,
                            isLeaf: true,
                            label: "tree2",
                            tree: {
                              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                              children: [],
                              name: "fieldTree2",
                              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                            },
                            treePath: "/tree/tree2",
                            type: "tree",
                          },
                          children: [],
                          name: "tree2",
                        },
                      ],
                      name: "password",
                    },
                  ],
                  name: "username",
                  treeId: "41042a08-4660-4609-af32-784bbd0503cf",
                },
                treePath: "/tree",
                type: "tree",
              },
              children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
              name: "tree",
            },
          ],
          name: "3",
        },
      ],
      name: "2",
    },
    {
      attributes: { depth: 2, isLeaf: false, label: "3", type: "text" },
      children: [
        {
          attributes: {
            depth: 3,
            isLeaf: false,
            label: "tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                  children: [
                    {
                      attributes: {
                        depth: 2,
                        isLeaf: true,
                        label: "tree2",
                        tree: {
                          attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                          children: [],
                          name: "fieldTree2",
                          treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                        },
                        treePath: "/tree/tree2",
                        type: "tree",
                      },
                      children: [],
                      name: "tree2",
                    },
                  ],
                  name: "password",
                },
              ],
              name: "username",
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            },
            treePath: "/tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" }],
          name: "tree",
        },
      ],
      name: "3",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
          children: [
            {
              attributes: {
                depth: 2,
                isLeaf: true,
                label: "tree2",
                tree: {
                  attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
                  children: [],
                  name: "fieldTree2",
                  treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                },
                treePath: "/tree/tree2",
                type: "tree",
              },
              children: [],
              name: "tree2",
            },
          ],
          name: "password",
        },
      ],
      name: "tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/tree",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
      children: [
        {
          attributes: {
            depth: 2,
            isLeaf: true,
            label: "tree2",
            tree: {
              attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
              children: [],
              name: "fieldTree2",
              treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
            },
            treePath: "/tree/tree2",
            type: "tree",
          },
          children: [],
          name: "tree2",
        },
      ],
      name: "tree.password",
      treePath: "/tree",
    },
    {
      attributes: { depth: 0, isLeaf: true, isRoot: true, label: "fieldTree2", type: "text" },
      children: [],
      name: "tree.tree2.fieldTree2",
      treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
      treePath: "/tree/tree2",
    },
    { attributes: { depth: 4, isLeaf: true, label: "Final", type: "text" }, children: [], name: "Final" },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          label: "2",
          type: "text",
        },
        children: [
          {
            attributes: {
              depth: 2,
              isLeaf: false,
              label: "3",
              type: "text",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "tree",
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
                          label: "Password",
                          type: "text",
                        },
                        children: [
                          {
                            attributes: {
                              depth: 2,
                              isLeaf: true,
                              label: "tree2",
                              tree: {
                                attributes: {
                                  depth: 0,
                                  isLeaf: true,
                                  isRoot: true,
                                  label: "fieldTree2",
                                  type: "text",
                                },
                                children: [],
                                name: "fieldTree2",
                                treeId: "be66c6aa-f99f-49de-be39-da7d32ebf8ca",
                              },
                              treePath: "/tree/tree2",
                              type: "tree",
                            },
                            children: [],
                            name: "tree2",
                          },
                        ],
                        name: "password",
                      },
                    ],
                    name: "username",
                    treeId: "41042a08-4660-4609-af32-784bbd0503cf",
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
                      type: "text",
                    },
                    children: [],
                    name: "Final",
                  },
                ],
                name: "tree",
              },
            ],
            name: "3",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithDecisionWithoutChildren: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "select" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
              children: [
                { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
                { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
              ],
              name: "decision",
            },
          ],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
          children: [
            { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
            { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
          ],
          name: "decision",
        },
      ],
      name: "2",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
      children: [
        { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
        { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
      ],
      name: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "select",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "2",
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
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: true,
                  label: "v1",
                  value: "v1",
                },
                children: [],
                name: "decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  isLeaf: true,
                  label: "v2",
                  value: "v2",
                },
                children: [],
                name: "decision:v2",
              },
            ],
            name: "decision",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithDecisionAndChildrens: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "select" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", type: "text" },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
              children: [
                {
                  attributes: { depth: 3, isLeaf: false, label: "v1", value: "v1" },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "v1child", type: "text" }, children: [], name: "v1child" }],
                  name: "decision:v1",
                },
                {
                  attributes: { depth: 3, isLeaf: false, label: "v2", value: "v2" },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "v2child", type: "text" }, children: [], name: "v2child" }],
                  name: "decision:v2",
                },
              ],
              name: "decision",
            },
          ],
          name: "2",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 1, isLeaf: false, isRoot: false, label: "2", type: "text" },
      children: [
        {
          attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
          children: [
            {
              attributes: { depth: 3, isLeaf: false, label: "v1", value: "v1" },
              children: [{ attributes: { depth: 4, isLeaf: true, label: "v1child", type: "text" }, children: [], name: "v1child" }],
              name: "decision:v1",
            },
            {
              attributes: { depth: 3, isLeaf: false, label: "v2", value: "v2" },
              children: [{ attributes: { depth: 4, isLeaf: true, label: "v2child", type: "text" }, children: [], name: "v2child" }],
              name: "decision:v2",
            },
          ],
          name: "decision",
        },
      ],
      name: "2",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
      children: [
        {
          attributes: { depth: 3, isLeaf: false, label: "v1", value: "v1" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "v1child", type: "text" }, children: [], name: "v1child" }],
          name: "decision:v1",
        },
        {
          attributes: { depth: 3, isLeaf: false, label: "v2", value: "v2" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "v2child", type: "text" }, children: [], name: "v2child" }],
          name: "decision:v2",
        },
      ],
      name: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "select",
    },
    children: [
      {
        attributes: {
          depth: 1,
          isLeaf: false,
          isRoot: false,
          label: "2",
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
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v1",
                  value: "v1",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v1child",
                      type: "text",
                    },
                    children: [],
                    name: "v1child",
                  },
                ],
                name: "decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v2",
                  value: "v2",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v2child",
                      type: "text",
                    },
                    children: [],
                    name: "v2child",
                  },
                ],
                name: "decision:v2",
              },
            ],
            name: "decision",
          },
        ],
        name: "2",
      },
    ],
    name: "1",
  },
};

const treeWithDecisionAndTree: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "select" },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            isRoot: false,
            label: "Tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
              children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
              name: "username",
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            },
            treePath: "/Tree",
            type: "tree",
          },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
              children: [
                {
                  attributes: { depth: 3, isLeaf: false, label: "v1", value: "v1" },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "v1child", type: "text" }, children: [], name: "v1child" }],
                  name: "decision:v1",
                },
                {
                  attributes: { depth: 3, isLeaf: false, label: "v2", value: "v2" },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "v2child", type: "text" }, children: [], name: "v2child" }],
                  name: "decision:v2",
                },
              ],
              name: "decision",
            },
          ],
          name: "Tree",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
      children: [{ attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "password" }],
      name: "Tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/Tree",
    },
    { attributes: { depth: 1, isLeaf: true, label: "Password", type: "text" }, children: [], name: "Tree.password", treePath: "/Tree" },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, isRoot: false, label: "decision", type: "select" },
      children: [
        {
          attributes: { depth: 3, isLeaf: false, label: "v1", value: "v1" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "v1child", type: "text" }, children: [], name: "v1child" }],
          name: "decision:v1",
        },
        {
          attributes: { depth: 3, isLeaf: false, label: "v2", value: "v2" },
          children: [{ attributes: { depth: 4, isLeaf: true, label: "v2child", type: "text" }, children: [], name: "v2child" }],
          name: "decision:v2",
        },
      ],
      name: "decision",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "select",
    },
    children: [
      {
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
                  isLeaf: true,
                  label: "Password",
                  type: "text",
                },
                children: [],
                name: "password",
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
              isDecision: true,
              isLeaf: false,
              isRoot: false,
              label: "decision",
              type: "select",
            },
            children: [
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v1",
                  value: "v1",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v1child",
                      type: "text",
                    },
                    children: [],
                    name: "v1child",
                  },
                ],
                name: "decision:v1",
              },
              {
                attributes: {
                  depth: 3,
                  isLeaf: false,
                  label: "v2",
                  value: "v2",
                },
                children: [
                  {
                    attributes: {
                      depth: 4,
                      isLeaf: true,
                      label: "v2child",
                      type: "text",
                    },
                    children: [],
                    name: "v2child",
                  },
                ],
                name: "decision:v2",
              },
            ],
            name: "decision",
          },
        ],
        name: "Tree",
      },
    ],
    name: "1",
  },
};

const treeWithChildrenAndDecisionInTree: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "select" },
      children: [
        {
          attributes: {
            depth: 1,
            isLeaf: false,
            isRoot: false,
            label: "Tree",
            tree: {
              attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
              children: [
                {
                  attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                  children: [
                    {
                      attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", type: "select" },
                      children: [
                        { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
                        { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
                      ],
                      name: "decision",
                    },
                  ],
                  name: "password",
                },
              ],
              name: "username",
              treeId: "41042a08-4660-4609-af32-784bbd0503cf",
            },
            treePath: "/Tree",
            type: "tree",
          },
          children: [{ attributes: { depth: 2, isLeaf: true, isRoot: false, label: "Final", type: "text" }, children: [], name: "Final" }],
          name: "Tree",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 0, isRoot: true, label: "Username", type: "text" },
      children: [
        {
          attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
          children: [
            {
              attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", type: "select" },
              children: [
                { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
                { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
              ],
              name: "decision",
            },
          ],
          name: "password",
        },
      ],
      name: "Tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/Tree",
    },
    {
      attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
      children: [
        {
          attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", type: "select" },
          children: [
            { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
            { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
          ],
          name: "decision",
        },
      ],
      name: "Tree.password",
      treePath: "/Tree",
    },
    {
      attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", type: "select" },
      children: [
        { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
        { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
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
                    attributes: { depth: 1, isLeaf: false, label: "Password", type: "text" },
                    children: [
                      {
                        attributes: { depth: 2, isDecision: true, isLeaf: false, label: "decision", type: "select" },
                        children: [
                          { attributes: { depth: 3, isLeaf: true, label: "v1", value: "v1" }, children: [], name: "decision:v1" },
                          { attributes: { depth: 3, isLeaf: true, label: "v2", value: "v2" }, children: [], name: "decision:v2" },
                        ],
                        name: "decision",
                      },
                    ],
                    name: "password",
                  },
                ],
                name: "username",
                treeId: "41042a08-4660-4609-af32-784bbd0503cf",
              },
              treePath: "/Tree",
              type: "tree",
            },
            children: [
              { attributes: { depth: 2, isLeaf: true, isRoot: false, label: "Final", type: "text" }, children: [], name: "Final" },
            ],
            name: "Tree",
          },
        },
      ],
      name: "Tree.decision",
      treePath: "/Tree",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "select",
    },
    children: [
      {
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
                  label: "Password",
                  type: "text",
                },
                children: [
                  {
                    attributes: {
                      depth: 2,
                      isDecision: true,
                      isLeaf: false,
                      label: "decision",
                      type: "select",
                    },
                    children: [
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v1",
                          value: "v1",
                        },
                        children: [],
                        name: "decision:v1",
                      },
                      {
                        attributes: {
                          depth: 3,
                          isLeaf: true,
                          label: "v2",
                          value: "v2",
                        },
                        children: [],
                        name: "decision:v2",
                      },
                    ],
                    name: "decision",
                  },
                ],
                name: "password",
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
              isRoot: false,
              label: "Final",
              type: "text",
            },
            children: [],
            name: "Final",
          },
        ],
        name: "Tree",
      },
    ],
    name: "1",
  },
};

const complexeTreeWithDecision: Mock = {
  output: [
    {
      attributes: { depth: 0, isLeaf: false, isRoot: true, label: "1", type: "text" },
      children: [
        {
          attributes: { depth: 4, isLeaf: true, label: "v2Field", type: "text" },
          children: [
            {
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
          ],
          name: "test celuila",
        },
      ],
      name: "1",
    },
    {
      attributes: { depth: 4, isLeaf: true, label: "v2Field", type: "text" },
      children: [
        {
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
      ],
      name: "test celuila",
    },
    {
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
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "v1Field", type: "text" }, children: [], name: "v1Field" }],
                  name: "Decision:v1",
                },
                {
                  attributes: { depth: 3, label: "v2", value: "v2" },
                  children: [{ attributes: { depth: 4, isLeaf: true, label: "v2Field", type: "text" }, children: [], name: "v2Field" }],
                  name: "Decision:v2",
                },
              ],
              name: "Decision",
            },
          ],
          name: "otherTree",
        },
      ],
      name: "Tree.username",
      treeId: "41042a08-4660-4609-af32-784bbd0503cf",
      treePath: "/Tree",
    },
    {
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
      name: "Tree.otherTree.Homme",
      treeId: "9f3977c4-7fc9-446c-a1eb-2720426edf5b",
      treePath: "/Tree/otherTree",
    },
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
      childrenTreeRest: [
        {
          currentTree: {
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
                    children: [{ attributes: { depth: 4, isLeaf: true, label: "v1Field", type: "text" }, children: [], name: "v1Field" }],
                    name: "Decision:v1",
                  },
                  {
                    attributes: { depth: 3, label: "v2", value: "v2" },
                    children: [{ attributes: { depth: 4, isLeaf: true, label: "v2Field", type: "text" }, children: [], name: "v2Field" }],
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
      name: "Tree.otherTree.newdecision",
      treePath: "/Tree/otherTree",
    },
  ],
  tree: {
    attributes: {
      depth: 0,
      isLeaf: false,
      isRoot: true,
      label: "1",
      type: "text",
    },
    children: [
      {
        attributes: {
          depth: 4,
          isLeaf: true,
          label: "v2Field",
          type: "text",
        },
        children: [
          {
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
        ],
        name: "test celuila",
      },
    ],
    name: "1",
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
