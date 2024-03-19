import { ChangeEvent, MouseEvent, useState } from "react";
import basicExample from "./data/basicExample";
import privateExample from "./data/privateExample";
import DataViewer from "./features/DataViewer";
import Sandbox from "./features/Sandbox";
import { TreegeConsumerProps } from "../src/features/TreegeConsumer";
import type TreeNode from "../src/types/TreeNode";
import { JsonFormValue } from "../src/utils/formDataToJSON/formDataToJSON";
import getApiAccessToken from "../src/utils/getApiAccessToken/getApiAccessToken";

const customHeaders = {
  Authorization: `Bearer ${await getApiAccessToken("arsene.lupin@tracktor.fr", "TestPassword!2023")}`,
};

const App = () => {
  const [tree, setTree] = useState<TreeNode>(basicExample);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("standard");
  const [formData, setFormData] = useState<JsonFormValue[] | [string, unknown][]>();
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
    // @ts-ignore
    const { value } = event.currentTarget;
    setTree(JSON.parse(value));
  };

  const handleSubmit = (submitData: JsonFormValue[] | [string, unknown][]) => {
    setFormData(submitData);
    setDialogOpen(true);
  };

  return component === "DataViewer" ? (
    <DataViewer handleChangeComponent={handleChangeComponent} />
  ) : (
    <Sandbox
      variant={variant}
      handleChangeVariant={handleChangeVariant}
      tree={tree}
      customHeaders={customHeaders}
      dialogOpen={dialogOpen}
      formData={formData}
      handleChangeTree={handleChangeTree}
      handleCloseDialog={handleCloseDialog}
      handleSubmit={handleSubmit}
      handleChangeComponent={handleChangeComponent}
    />
  );
};
export default App;
