import { useEffect } from "react";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
  defaultValue?: unknown;
  onChange?(dataAttribute: ChangeEventField): void;
}

const HiddenField = ({ defaultValue, data, onChange }: HiddenFieldProps) => {
  const { name, attributes } = data;
  const { hiddenValue, type } = attributes;

  useEffect(() => {
    onChange?.({ name, type, value: hiddenValue });
  }, [hiddenValue, name, onChange, type]);

  return <input type="hidden" name={name} value={hiddenValue} defaultValue={defaultValue as string} />;
};

export default HiddenField;
