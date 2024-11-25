import basicExample from "example/data/basicExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { ChangeEvent, MouseEvent, useState } from "react";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";
import TreeNode from "@/types/TreeNode";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(basicExample);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variant, setVariant] = useState<TreegeConsumerProps["variant"]>("standard");
  const [submitData, setSubmitData] = useState<OnSubmitReturn>();
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
      variant={variant}
      tree={tree}
      customHeaders={{ Authorization: `Bearer - yourApiToken` }}
      dialogOpen={dialogOpen}
      handleChangeVariant={handleChangeVariant}
      handleChangeTree={handleChangeTree}
      handleCloseDialog={handleCloseDialog}
      onSubmit={handleSubmit}
      submitData={submitData}
      handleChangeComponent={handleChangeComponent}
      options={{
        disablePastDateRangePicker: true,
      }}
    />
  );
};
export default App;
