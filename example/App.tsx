import basicExample from "example/data/basicExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { ChangeEvent, MouseEvent, useState } from "react";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import { OnSubmitParams } from "@/features/TreegeConsumer/useTreegeConsumer";
import type TreeNode from "@/types/TreeNode";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(basicExample);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("standard");
  const [submitData, setSubmitData] = useState<OnSubmitParams>();
  const [component, setComponent] = useState<"DataViewer" | "TreegeConsumer">("TreegeConsumer");

  const handleChangeComponent = (newComponent: "DataViewer" | "TreegeConsumer") => {
    setComponent(newComponent);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChangeVariant = (_: MouseEvent<HTMLElement>, newAlignment: TreegeConsumerProps["variant"]) => {
    setVariant(newAlignment);
  };

  const handleChangeTree = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setTree(JSON.parse(value));
  };

  const handleSubmit = ({ data, formData, fieldValues }: OnSubmitParams) => {
    setSubmitData({ data, fieldValues, formData });
    setDialogOpen(true);
  };

  return component === "DataViewer" ? (
    <DataViewer handleChangeComponent={handleChangeComponent} />
  ) : (
    <Sandbox
      variant={variant}
      tree={tree}
      dialogOpen={dialogOpen}
      handleChangeVariant={handleChangeVariant}
      handleChangeTree={handleChangeTree}
      handleCloseDialog={handleCloseDialog}
      handleSubmit={handleSubmit}
      submitData={submitData}
      handleChangeComponent={handleChangeComponent}
    />
  );
};
export default App;
