import { Box, Container, ToggleButton, ToggleButtonGroup } from "design-system";
import type { MouseEvent } from "react";
import { useState } from "react";
import data from "@/data/export.json";
import TreegeForm, { TreegeFormProps } from "@/features/TreegeForm";

const App = () => {
  const [variant, setVariant] = useState<TreegeFormProps["variant"]>("stepper");

  const handleChange = (_: MouseEvent<HTMLElement>, newAlignment: TreegeFormProps["variant"]) => {
    setVariant(newAlignment);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" padding={5}>
        <ToggleButtonGroup value={variant} exclusive onChange={handleChange}>
          <ToggleButton value="stepper">Stepper</ToggleButton>
          <ToggleButton value="standard">Standard</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TreegeForm tree={data} variant={variant} />
    </Container>
  );
};
export default App;
