import type { TreeNode } from "@/types/TreeNode";

const getNextStepper = (restArray?: TreeNode[]) => {
  if (!restArray?.length) {
    return 0;
  }

  let stepper = 0;

  for (let i = 0; i < restArray.length; i += 1) {
    const {
      attributes: { type },
    } = restArray[i];

    if (type === "hidden") {
      stepper += 1;
    } else {
      break;
    }
  }

  return stepper;
};

export default getNextStepper;
