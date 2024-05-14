import { TextField } from "@tracktor/design-system";
import { useEffect, useRef } from "react";
import ChangeEventField from "@/types/ChangeEventField";
import type TreeNode from "@/types/TreeNode";

export interface HiddenFieldProps {
  data: TreeNode;
  onInit?(dataAttribute: ChangeEventField): void;
}

const HiddenField = ({ data, onInit }: HiddenFieldProps) => {
  const onInitRef = useRef(onInit);
  const { attributes } = data;
  const { name, hiddenValue } = attributes;

  // Trigger the onInit when the component is mounted to initialize the hidden field value
  useEffect(() => {
    onInitRef.current?.({ name, value: hiddenValue });
  }, [hiddenValue, name]);

  // Update the onInitRef when the onInit changes
  useEffect(() => {
    onInitRef.current = onInit;
  }, [onInit]);

  return <TextField type="hidden" name={name} value={hiddenValue} sx={{ display: "none" }} onInput={() => console.log("aa")} />;
};

export default HiddenField;
