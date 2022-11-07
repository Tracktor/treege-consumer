import { TextField as TextFieldDS } from "design-system-tracktor";
import { forwardRef, Ref } from "react";
import type { TreeNode } from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
  inputRef: Ref<any>;
}

const HiddenField = ({ data, inputRef }: HiddenFieldProps, ref: Ref<HTMLDivElement>) => {
  const { name, attributes } = data;
  const { label, hiddenValue } = attributes;

  return <TextFieldDS ref={ref} inputRef={inputRef} type="text" name={name} label={label} value={hiddenValue} sx={{ display: "none" }} />;
};

export default forwardRef(HiddenField);
