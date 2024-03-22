import { Button, Container, Stack, ThemeProvider } from "@tracktor/design-system";
import Renderer from "example/features/DataViewer/Renderer";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface DataViewerProps {
  handleChangeComponent: (newComponent: "DataViewer" | "TreegeConsumer") => void;
  formData?: JsonFormValue[] | [string, unknown][];
}

// const values = [
//   {
//     label: "Catégorie",
//     name: "category",
//     tag: "category",
//     type: "select",
//     value: {
//       label: "Lorem ipsum",
//       value: "delivery",
//     },
//   },
//   {
//     label: "Type d'incident",
//     name: "delivery_reason",
//     tag: "reason",
//     type: "select",
//     value: {
//       label: "Livraison -Retard sup 1h30 max 3h00",
//       value: "delay_in_delivery",
//     },
//   },
//   {
//     label: "Responsabilité",
//     name: "delivery_responsibility",
//     tag: "responsible",
//     type: "select",
//     value: {
//       label: "Fournisseur",
//       value: "supplier",
//     },
//   },
// ];

const DataViewer = ({ handleChangeComponent, formData }: DataViewerProps) => {
  console.log("formData", formData);
  return (
    <ThemeProvider>
      <Container>
        <Stack alignItems="center" p={3}>
          <Button variant="link" onClick={() => handleChangeComponent("TreegeConsumer")}>
            See TreegeConsumer
          </Button>
        </Stack>
        <Renderer values={formData} />
      </Container>
    </ThemeProvider>
  );
};

export default DataViewer;
