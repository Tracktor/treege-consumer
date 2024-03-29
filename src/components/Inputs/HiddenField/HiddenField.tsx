import type TreeNode from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
  value?: unknown;
}

const HiddenField = ({ data, value }: HiddenFieldProps) => {
  const { name } = data;

  return <input type="hidden" name={name} value={String(value)} />;
};

export default HiddenField;
