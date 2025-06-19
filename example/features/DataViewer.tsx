import { Button, Container, Divider, Stack, ThemeProvider } from "@tracktor/design-system";
import basicValuesConsumerExample from "example/data/basicValuesConsumerExample";
import { useState } from "react";
import { TreegeViewer } from "@/main";

interface DataViewerProps {
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
}

const DataViewer = ({ handleChangeComponent }: DataViewerProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <ThemeProvider theme="dark">
      <Container>
        <Stack alignItems="center" p={3}>
          <Button variant="link" onClick={() => handleChangeComponent("TreegeConsumer")}>
            See TreegeConsumer
          </Button>

          <Divider sx={{ my: 3 }} />

          <Button variant="contained" onClick={handleToggle}>
            Toggle collapse from outside
          </Button>
        </Stack>
        <TreegeViewer useCollapse values={basicValuesConsumerExample} isCollapsed={isCollapsed} onToggleCollapse={handleToggle} />
      </Container>
    </ThemeProvider>
  );
};
export default DataViewer;
