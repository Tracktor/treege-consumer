import basicExample from "example/data/basicExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { ChangeEvent, MouseEvent, useState } from "react";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import type TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(basicExample);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("standard");
  const [formData, setFormData] = useState<JsonFormValue[] | [string, unknown][]>();
  const [renderData, setRenderData] = useState<"json" | "formData">("json");
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

  const handleSubmit = (submitData: JsonFormValue[] | [string, unknown][]) => {
    setFormData(submitData);
    setDialogOpen(true);
  };

  const handleChangeFormatData = (_: MouseEvent<HTMLElement>, newRenderData: "json" | "formData") => {
    setRenderData(newRenderData);
  };

  return component === "DataViewer" ? (
    <DataViewer handleChangeComponent={handleChangeComponent} />
  ) : (
    <Sandbox
      variant={variant}
      tree={tree}
      dialogOpen={dialogOpen}
      formData={formData}
      renderData={renderData}
      handleChangeVariant={handleChangeVariant}
      handleChangeTree={handleChangeTree}
      handleCloseDialog={handleCloseDialog}
      handleSubmit={handleSubmit}
      handleChangeComponent={handleChangeComponent}
      handleChangeFormatData={handleChangeFormatData}
    />
  );
};
export default App;
