import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { useState } from "react";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";

const App = () => {
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

  const handleSubmit = async ({ data, formData, fieldValues, detailFieldValues }: OnSubmitReturn) => {
    setIsSubmitting(true);

    // Simulate async call
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });

    setIsSubmitting(false);
    setSubmitData({ data, detailFieldValues, fieldValues, formData });
    setDialogOpen(true);
  };

  return component === "DataViewer" ? (
    <DataViewer handleChangeComponent={handleChangeComponent} />
  ) : (
    <Sandbox
      isSubmitting={isSubmitting}
      dialogOpen={dialogOpen}
      handleCloseDialog={handleCloseDialog}
      onSubmit={handleSubmit}
      submitData={submitData}
      handleChangeComponent={handleChangeComponent}
      customHeaders={{
        ...(import.meta.env.VITE_BEARER_TOKEN ? { Authorization: import.meta.env.VITE_BEARER_TOKEN } : {}),
        "Content-Type": "application/json",
      }}
    />
  );
};
export default App;
