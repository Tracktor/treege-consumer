import type { TreeNode } from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
  defaultValue?: unknown;
}

const HiddenField = ({ defaultValue, data }: HiddenFieldProps) => {
  const { name, attributes } = data;
  const { hiddenValue } = attributes;

  return <input type="hidden" name={name} value={hiddenValue} defaultValue={defaultValue as string} />;
};

export default HiddenField;
