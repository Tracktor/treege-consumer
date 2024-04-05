import { TextField } from "@tracktor/design-system";
import type TreeNode from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
  value?: unknown;
}

const HiddenField = ({ data, value }: HiddenFieldProps) => {
  const {
    attributes: { name },
  } = data;

  return <TextField type="hidden" name={name} value={value} />;
};

export default HiddenField;
