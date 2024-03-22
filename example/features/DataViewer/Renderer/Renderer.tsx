import { List, ListItem, TextField } from "@tracktor/design-system";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

export interface FormDataItem {
  label: string;
  value: unknown;
  name: string;
  type: string;
}

interface RendererProps {
  values?: JsonFormValue[] | [string, unknown][];
}

const Renderer = ({ values }: RendererProps) => (
  <List>
    {/* @ts-ignore*/}
    {values.map(({ label, value }, index) => {
      const key = `${index}-${label}-${value}`;
      const displayValue =
        typeof value === "object" && value !== null && "label" in value ? (value as { label: string }).label : JSON.stringify(value);

      return (
        <ListItem key={key} disableGutters>
          <TextField
            fullWidth
            multiline
            label={label}
            value={displayValue}
            inputProps={{
              readOnly: true,
            }}
          />
        </ListItem>
      );
    })}
  </List>
);

export default Renderer;
