import type { TreeNode } from "@tracktor/types-treege";

const getNextStepper = (restArray?: TreeNode[]) => {
  let stepper = 0;

  if (!restArray?.length) {
    return stepper;
  }

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
