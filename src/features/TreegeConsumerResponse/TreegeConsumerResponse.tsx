import { Checkbox, FormControlLabel, List, ListItem, TextField } from "@tracktor/design-system";
import { isObject } from "@tracktor/react-utils";
import type { ReactElement } from "react";
import { IsString } from "@/types/TypeGuards";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

export interface TreegeConsumerResponseProps {
  /**
   * Render custom render input value ()
   * <TreegeConsumer renderInput={(input) => <CustomInput input={input} />} />
   */
  renderInputs?(input: JsonFormValue): ReactElement | undefined;
  /**
   * Json form value
   */
  values: JsonFormValue[];
}

const checkValue = (value: unknown) => {
  if (IsString(value)) {
    return value;
  }

  if (isObject(value) && "label" in value && IsString(value?.label)) {
    return value.label;
  }

  return "";
};

const TreegeConsumerResponse = ({ values, renderInputs }: TreegeConsumerResponseProps) => {
  const isCustomRenderInput = values && renderInputs;

  if (isCustomRenderInput) {
    return values?.map((value) => renderInputs(value));
  }

  return (
    <List>
      {values.map(({ label, value, type }, index) => {
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
