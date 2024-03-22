import { Button, Container, Stack, ThemeProvider } from "@tracktor/design-system";
import Renderer, { TreeInitialValue } from "example/features/DataViewer/Renderer";
import type TreeNode from "@/types/TreeNode";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
import getFieldsFromTreePoint from "@/utils/getFieldsFromTreePoint";

interface DataViewerProps {
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
  formData?: JsonFormValue[] | [string, unknown][];
  tree: TreeNode;
}

const DataViewer = ({ handleChangeComponent, formData, tree }: DataViewerProps) => {
  const treeInitialValue: TreeInitialValue[] = (() => {
    const initialValue: TreeInitialValue[] = [];
    const initialFields = getFieldsFromTreePoint({ currentTree: tree });
    initialFields.forEach((field) => {
      initialValue.push({ name: field.name, value: undefined });
    });
    return initialValue;
  })();

  return (
    <ThemeProvider>
      <Container>
        <Stack alignItems="center" p={3}>
          <Button variant="link" onClick={() => handleChangeComponent("TreegeConsumer")}>
            See TreegeConsumer
          </Button>
        </Stack>
        <Renderer values={formData} initialTree={treeInitialValue} />
      </Container>
    </ThemeProvider>
  );
};

export default DataViewer;
