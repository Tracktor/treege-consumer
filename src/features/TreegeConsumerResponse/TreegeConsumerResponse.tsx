import { Checkbox, FormControlLabel, List, ListItem, TextField } from "@tracktor/design-system";
import { isObject, isString } from "@tracktor/react-utils";
import { ReactElement } from "react";
import { JsonFormValue } from "@/types/JsonFormValue";

export interface TreegeConsumerResponseProps {
  /**
   * Render custom render input value ()
   * <TreegeConsumer renderInput={(input) => <CustomInput input={input} />} />
   */
  renderInputs?(input: JsonFormValue): ReactElement | undefined;
  /**
   * Json form value
   */
  values?: JsonFormValue[] | null;
  /**
   * Array of field name that we want to ignore
   */
  ignoreFields?: string[];
}

const checkValue = (value: unknown) => {
  if (isString(value)) {
    return value;
  }

  if (isObject(value) && "label" in value && isString(value?.label)) {
    return value.label;
  }

  return "";
};

const TreegeConsumerResponse = ({ values, renderInputs, ignoreFields }: TreegeConsumerResponseProps) => {
  const isCustomRenderInput = values && renderInputs;
  const enableValues = values?.filter((value) => !ignoreFields?.find((name) => name === value.name));

  if (isCustomRenderInput) {
    return enableValues?.map((value) => renderInputs(value));
  }

  return (
    <List>
      {enableValues?.map(({ label, value, type }, index) => {
        const key = `${index}-${label}-${value}`;
        const responseValue = checkValue(value);
        const isBooleanField = ["switch", "checkbox"]?.includes(type || "");

        if (isBooleanField) {
          return (
            <ListItem key={key} disableGutters>
              <FormControlLabel control={<Checkbox checked={!!value} readOnly />} label={label} />
            </ListItem>
          );
        }

        return (
          <ListItem key={key} disableGutters>
            <TextField
              fullWidth
              multiline
              label={label}
              value={responseValue}
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

export default TreegeConsumerResponse;
