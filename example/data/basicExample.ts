import type { TreeNode } from "@tracktor/types-treege";

const basicExample: TreeNode = {
  attributes: {
    defaultValueFromAncestor: {
      inputObjectKey: "azeb",
      outputModel: "string",
      uuid: "17476890990237qj97rw1259.1999999284744",
    },
    depth: 0,
    isLeaf: false,
    isRoot: true,
    label: "a",
    name: "a",
    type: "text",
  },
  children: [
    {
      attributes: {
        ancestorId: "17476890990237qj97rw1259.1999999284744",
        defaultValueFromAncestor: {
          inputObjectKey: "1234",
          outputModel: "numeric",
          uuid: "1747689114405tlbni1y16641.699999928474",
        },
        depth: 1,
        isLeaf: true,
        label: "b",
        name: "b",
        type: "text",
      },
      children: [],
      uuid: "1747689114405tlbni1y16641.699999928474",
    },
  ],
  uuid: "17476890990237qj97rw1259.1999999284744",
};

export default basicExample;
