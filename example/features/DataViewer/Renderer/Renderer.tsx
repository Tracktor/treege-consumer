import { List, ListItem, TextField } from "@tracktor/design-system";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

export type TreeInitialValue = {
  name: string;
  value: unknown;
};

interface RendererProps {
  values?: JsonFormValue[] | [string, unknown][] | unknown[];
  initialTree?: TreeInitialValue[];
}

const Renderer = ({ values, initialTree }: RendererProps) => {
  const renderValue = values || initialTree || [];
  return (
    <List>
      {(renderValue as { label?: string; name?: string; value: any; index: number }[])?.map(({ label, name, value, index }) => {
        const key = `${name}-${label}-${value}-${index}`;

        const formValue =
          typeof value === "object" && value !== null && "label" in value ? (value as { label: string }).label : JSON.stringify(value);

        return (
          <ListItem key={key} disableGutters>
            <TextField
              fullWidth
              multiline
              label={label || name}
              value={formValue}
              inputProps={{
                readOnly: true,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Renderer;
