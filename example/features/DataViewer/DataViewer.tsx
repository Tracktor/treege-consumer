import { Button, Container, Stack, ThemeProvider } from "@tracktor/design-system";
import basicValuesConsumerExample from "example/data/basicValuesConsumerExample";
import { TreegeConsumerResponse } from "@/main";

interface DataViewerProps {
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
}

const DataViewer = ({ handleChangeComponent }: DataViewerProps) => (
  <ThemeProvider>
    <Container>
      <Stack alignItems="center" p={3}>
        <Button variant="link" onClick={() => handleChangeComponent("TreegeConsumer")}>
          See TreegeConsumer
        </Button>
      </Stack>
      <TreegeConsumerResponse values={basicValuesConsumerExample} />
    </Container>
  </ThemeProvider>
);

export default DataViewer;
