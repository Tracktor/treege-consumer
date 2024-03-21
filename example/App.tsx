import privateExample from "example/data/privateExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import getApiAccessToken from "example/utils/getApiAccessToken/getApiAccessToken";
import { ChangeEvent, MouseEvent, useState } from "react";
// import basicExample from "@example/data/basicExample";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import type TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

const bearerTokenAccess = {
  Authorization: `Bearer ${await getApiAccessToken("arsene.lupin@tracktor.fr", "TestPassword!2023")}`,
};

const App = () => {
  const [tree, setTree] = useState<TreeNode>(privateExample);
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
      customHeaders={bearerTokenAccess}
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
