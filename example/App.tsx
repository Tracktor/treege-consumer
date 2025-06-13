import type { TreeNode } from "@tracktor/types-treege";
import ancestorTest1 from "example/data/ancestorTest1";
// import autocompleteTest from "example/data/autocompleteExample";
import DataViewer from "example/features/DataViewer";
import Sandbox from "example/features/Sandbox";
import { ChangeEvent, useState } from "react";
import { OnSubmitReturn } from "@/types/OnSubmitReturn";

const App = () => {
  const [tree, setTree] = useState<TreeNode>(ancestorTest1);
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
      // todo: dont commit this
      customHeaders={{
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwiZW50aXR5X2lkIjoxLCJ0ZW5hbnRfaWQiOjEsInNjb3BlIjpbImZpbGVzIiwibm90ZXMiLCJvcmRlcnMiLCJzZWFyY2giLCJiaWxsaW5nIiwiYW5hbHl0aWMiLCJvdmVydmlldyIsInBhcnRuZXJzIiwic2V0dGluZ3MiLCJhZGRfZXZlbnQiLCJkYXNoYm9hcmQiLCJlZGl0X25vdGUiLCJuZXdfb3JkZXIiLCJ3b3Jrc2l0ZXMiLCJlZGl0X2RhdGVzIiwibG9ja19iaWxscyIsInJlZmVyZW5jZXMiLCJjbG9zZV9iaWxscyIsImRlbGV0ZV9maWxlIiwiZGVsZXRlX25vdGUiLCJkZWxldGVfdXNlciIsIm1vZGlmeV9iaWxscyIsIm1vZGlmeV9ldmVudCIsImJvb2tpbmdzX2ZpbGVzIiwiZWRpdF9lcXVpcG1lbnQiLCJvZmZlcl9yZWNlaXZlZCIsInB1cmNoYXNlX29yZGVyIiwidmFsaWRhdGVfb3JkZXIiLCJhc3NpZ25fdG9fb3JkZXIiLCJib29raW5nX2JpbGxpbmciLCJjYW5jZWxfc291cmNpbmciLCJjcmVhdGVfd29ya3NpdGUiLCJzZWFyY2hfc3VwcGxpZXIiLCJtb2RpZnlfd29ya3NpdGVzIiwiZHVwbGljYXRlX2Jvb2tpbmciLCJyZWNlaXZlX3RoZV9vcmRlciIsImFkZF9hbmRfZWRpdF9ldmVudCIsImVkaXRfb3JkZXJfc3VtbWFyeSIsImJvb2tpbmdfY3JlYXRlX3VzZXIiLCJtb2RpZnlfZXZlbnRfc3RhdHVzIiwiZWRpdF9iaWxsaW5nX3JlZmVyZW5jZSIsIm1ha2VfYmlsbGluZ19yZWNlcHRpb24iLCJjcmVhdGVfYmlsbGluZ19yZWZlcmVuY2UiLCJlZGl0X2RlbGl2ZXJ5X2FuZF9yZXR1cm4iLCJlZGl0X2FkZGl0aW9uYWxfaW5mb3JtYXRpb24iLCJnZW5lcmF0ZV9ib29raW5nX3JlcXVlc3RfZG9jIl0sImV4cCI6MTc1MTY1NjE1N30.cupAF43Bu9UrmePF01V9wBGPS0u3puDntV9fIqPSEgA",
        "Content-Type": "application/json",
      }}
    />
  );
};
export default App;
