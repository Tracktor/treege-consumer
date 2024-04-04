import type TreeNode from "@/types/TreeNode";
import { IsString } from "@/types/TypeGuards";

export interface HiddenFieldProps {
  data: TreeNode;
  value?: unknown;
}

const HiddenField = ({ data, value }: HiddenFieldProps) => {
  const {
    attributes: { name },
  } = data;

  return <input type="hidden" name={name} value={IsString(value) ? value : ""} />;
};

export default HiddenField;
