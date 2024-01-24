import { List, ListItem, TextField } from "@tracktor/design-system";

export interface TreegeValuesConsumerProps {
  values: {
    label: string;
    name: string;
    type: string;
    tag?: string | null;
    value:
      | string
      | {
          label: string;
          value: string;
        };
  }[];
}

const TreegeValuesConsumer = ({ values }: TreegeValuesConsumerProps) => (
  <List>
    {values.map(({ label, value }, index) => {
      const key = `${index}-${label}-${value}`;

      return (
        <ListItem key={key} disableGutters>
          <TextField
            fullWidth
            multiline
            label={label}
            value={typeof value === "string" ? value : value?.label}
            inputProps={{
              readOnly: true,
            }}
          />
        </ListItem>
      );
    })}
  </List>
);

export default TreegeValuesConsumer;
