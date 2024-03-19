import { ChangeEvent, MouseEvent, useState } from "react";
import privateExample from "@/demo/privateExample";
import DataViewer from "@/features/DataViewer";
import Sandbox from "@/features/Sandbox";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import type TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
import getApiAccessToken from "@/utils/getApiAccessToken/getApiAccessToken";

const accessToken = await getApiAccessToken("arsene.lupin@tracktor.fr", "TestPassword!2023");

const customHeaders = {
  Authorization: `Bearer ${accessToken}`,
};

const App = () => {
  const [tree, setTree] = useState<TreeNode>(privateExample);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("standard");
  const [formData, setFormData] = useState<JsonFormValue[] | [string, FormDataEntryValue][]>();
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

  const handleSubmit = (submitData: JsonFormValue[] | [string, FormDataEntryValue][]) => {
    setFormData(submitData);
    setDialogOpen(true);
  };

  return (
    <>
      {component === "DataViewer" ? (
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
      )}
    </>
  );
};
export default App;
