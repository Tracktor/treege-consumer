import type { TreeNode } from "@tracktor/types-treege";
import autocompleteTest from "example/data/autocompleteExample";
import basicExample from "example/data/basicExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { ChangeEvent, useState } from "react";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(basicExample);
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

  const header = {
    Authorization:
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwiZW50aXR5X2lkIjoxLCJ0ZW5hbnRfaWQiOjEsInNjb3BlIjpbImZpbGVzIiwibm90ZXMiLCJvcmRlcnMiLCJzZWFyY2giLCJiaWxsaW5nIiwiYW5hbHl0aWMiLCJvdmVydmlldyIsInBhcnRuZXJzIiwic2V0dGluZ3MiLCJhZGRfZXZlbnQiLCJkYXNoYm9hcmQiLCJlZGl0X25vdGUiLCJuZXdfb3JkZXIiLCJ3b3Jrc2l0ZXMiLCJlZGl0X2RhdGVzIiwibG9ja19iaWxscyIsInJlZmVyZW5jZXMiLCJjbG9zZV9iaWxscyIsImRlbGV0ZV9maWxlIiwiZGVsZXRlX25vdGUiLCJkZWxldGVfdXNlciIsIm1vZGlmeV9iaWxscyIsIm1vZGlmeV9ldmVudCIsImJvb2tpbmdzX2ZpbGVzIiwiZWRpdF9lcXVpcG1lbnQiLCJvZmZlcl9yZWNlaXZlZCIsInB1cmNoYXNlX29yZGVyIiwiYXNzaWduX3RvX29yZGVyIiwiYm9va2luZ19iaWxsaW5nIiwiY2FuY2VsX3NvdXJjaW5nIiwiY3JlYXRlX3dvcmtzaXRlIiwic2VhcmNoX3N1cHBsaWVyIiwibW9kaWZ5X3dvcmtzaXRlcyIsImR1cGxpY2F0ZV9ib29raW5nIiwicmVjZWl2ZV90aGVfb3JkZXIiLCJhZGRfYW5kX2VkaXRfZXZlbnQiLCJlZGl0X29yZGVyX3N1bW1hcnkiLCJib29raW5nX2NyZWF0ZV91c2VyIiwibW9kaWZ5X2V2ZW50X3N0YXR1cyIsImVkaXRfYmlsbGluZ19yZWZlcmVuY2UiLCJtYWtlX2JpbGxpbmdfcmVjZXB0aW9uIiwiY3JlYXRlX2JpbGxpbmdfcmVmZXJlbmNlIiwiZWRpdF9kZWxpdmVyeV9hbmRfcmV0dXJuIiwiZWRpdF9hZGRpdGlvbmFsX2luZm9ybWF0aW9uIiwiZ2VuZXJhdGVfYm9va2luZ19yZXF1ZXN0X2RvYyJdLCJleHAiOjE3NTAzMzAwOTZ9.wWklQ62-bCzfC0ekfhFgTyddMXZAmbcGbj30oeL0dAk",
    "Content-Type": "application/json",
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
      customHeaders={header}
    />
  );
};
export default App;
