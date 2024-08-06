import { Checkbox, Collapse, FormControlLabel, List, ListItem, TextField, IconButton, SvgIcon, Box } from "@tracktor/design-system";
import { isObject, isString, useToggle } from "@tracktor/react-utils";
import { ReactElement } from "react";
import { JsonFormValue } from "@/types/JsonFormValue";

export interface TreegeConsumerResponseProps {
  renderInputs?(input: JsonFormValue): ReactElement | undefined;
  values?: JsonFormValue[] | null;
  ignoreFields?: string[];
  collapse?: boolean;
  collapseVisibleItemNumber?: number;
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

const TreegeConsumerResponse = ({
  values,
  renderInputs,
  ignoreFields,
  collapse,
  collapseVisibleItemNumber = 4,
}: TreegeConsumerResponseProps) => {
  const [isCollapsed, toggleCollapse] = useToggle(false);
  const isCustomRenderInput = values && renderInputs;
  const filteredValues = values?.filter((value) => !ignoreFields?.includes(value.name));

  const renderDefault = (items: JsonFormValue[]) => (
    <List>
      {(collapse ? items.slice(0, collapseVisibleItemNumber) : items)?.map(({ label, value, type }, index) => {
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

      {collapse && (
        <Collapse in={isCollapsed}>
          {items.slice(collapseVisibleItemNumber).map(({ label, value, type }, index) => {
            const key = `${collapseVisibleItemNumber + index}-${label}-${value}`;
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
        </Collapse>
      )}
    </List>
  );

  const renderCustom = (items: JsonFormValue[]) => (
    <>
      {/* Visible Items */}
      {items.slice(0, collapse ? collapseVisibleItemNumber : items.length).map((value, index) => {
        const key = `${index}-${value.label}-${value.value}`;
        return <div key={key}>{renderInputs!(value)}</div>;
      })}
      {/* Collapse items */}
      {collapse && (
        <Collapse in={isCollapsed}>
          {items.slice(collapseVisibleItemNumber).map((value, index) => {
            const key = `${collapseVisibleItemNumber + index}-${value.label}-${value.value}`;
            return <div key={key}>{renderInputs!(value)}</div>;
          })}
        </Collapse>
      )}
    </>
  );

  return (
    <>
      {/* Render */}
      {isCustomRenderInput ? renderCustom(filteredValues!) : renderDefault(filteredValues!)}

      {/* Collapse toggle button */}
      {collapse && filteredValues && filteredValues.length > collapseVisibleItemNumber && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton onClick={toggleCollapse}>
            <SvgIcon viewBox="0 0 24 24" sx={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </SvgIcon>
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default TreegeConsumerResponse;
