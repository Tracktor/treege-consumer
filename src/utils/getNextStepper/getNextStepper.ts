import type { TreeNode } from "@/types/TreeNode";

const getNextStepper = (restArray?: TreeNode[]) => {
  if (!restArray?.length) {
    return 0;
  }

  let stepper = 0;

  restArray.some(({ attributes: { type } }) => {
    if (type === "hidden") {
      stepper += 1;
      return false;
    }
    return true;
  });

  return stepper;
};

export default getNextStepper;
