import type { TreeNode } from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
}

const HiddenField = ({ data }: HiddenFieldProps) => {
  const { name, attributes } = data;
  const { hiddenValue } = attributes;

  return <input type="hidden" name={name} value={hiddenValue} />;
};

export default HiddenField;
