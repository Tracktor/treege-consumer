import type { TreeNode } from "@/types/TreeNode";

const getNextStepper = (restArray: TreeNode[], revert?: boolean) => {
  let stepper = 0;
  const restArrayStepper = [...(revert ? restArray.reverse() : restArray)];

  for (let i = 0; i < restArrayStepper.length; i += 1) {
    const {
      attributes: { type },
    } = restArrayStepper[i];
    if (type === "hidden") {
      stepper += 1;
    } else {
      break;
    }
  }

  return stepper;
};

export default getNextStepper;
