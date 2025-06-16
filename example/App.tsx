import type { TreeNode } from "@tracktor/types-treege";
// import ancestorTest1 from "example/data/ancestorTest1";
import autocompleteTest from "example/data/autocompleteExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { ChangeEvent, useState } from "react";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(autocompleteTest);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState<OnSubmitReturn>();
  const [component, setComponent] = useState<"DataViewer" | "TreegeConsumer">("TreegeConsumer");

  const handleChangeComponent = (newComponent: "DataViewer" | "TreegeConsumer") => {
    setComponent(newComponent);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChangeTree = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setTree(JSON.parse(value));
  };

  const handleSubmit = async ({ data, formData, fieldValues }: OnSubmitReturn) => {
    setIsSubmitting(true);

    // Simulate async call
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });

    setIsSubmitting(false);
    setSubmitData({ data, fieldValues, formData });
    setDialogOpen(true);
  };

  return component === "DataViewer" ? (
    <DataViewer handleChangeComponent={handleChangeComponent} />
  ) : (
    <Sandbox
      isSubmitting={isSubmitting}
      tree={tree}
      dialogOpen={dialogOpen}
      handleChangeTree={handleChangeTree}
      handleCloseDialog={handleCloseDialog}
      onSubmit={handleSubmit}
      submitData={submitData}
      handleChangeComponent={handleChangeComponent}
      customHeaders={{
        Authorization: (import.meta as any).env.VITE_BEARER_TOKEN || "",
        "Content-Type": "application/json",
      }}
    />
  );
};
export default App;
