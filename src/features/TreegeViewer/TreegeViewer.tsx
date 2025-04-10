import { Checkbox, Collapse, FormControlLabel, List, ListItem, TextField, IconButton, SvgIcon, Box } from "@tracktor/design-system";
import { isObject, isString, useToggle } from "@tracktor/react-utils";
import { ReactElement } from "react";
import { JsonFormValue } from "@/types/JsonFormValue";

export interface TreegeViewerProps {
  /**
   * Json form value
   */
  values?: JsonFormValue[] | null;
  /**
   * Array of field name that we want to ignore (replaces `ignoreFields`)
   * @d
   */
  excludedFields?: string[];
  /**
   * Enable internal collapse or not
   */
  useCollapse?: boolean;
  /**
   * Number of visible item before collapse
   */
  collapseVisibleItemNumber?: number;
  /**
   * Collapsed state
   */
  isCollapsed?: boolean;
  /**
   * Function triggered when collapse is toggled
   * Only trigger when "useCollapse" is true
   */
  onToggleCollapse?: () => void;
  /**
   * Render custom fields (replaces `renderInputs`)
   * <TreegeConsumer renderFields={({ value, name, type }) => <input name={name} type={type} value={value} />}/>
   */
  renderFields?(input: JsonFormValue): ReactElement | undefined;
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

const TreegeViewer = ({
  values,
  renderFields,
  excludedFields,
  useCollapse,
  isCollapsed,
  onToggleCollapse,
  collapseVisibleItemNumber = 4,
}: TreegeViewerProps) => {
  const [internalIsCollapsed, toggleInternalIsCollapsed] = useToggle(false);
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalIsCollapsed;
  const collapseIsEnabled = useCollapse || isCollapsed !== undefined;
  const isCustomRenderInput = values && renderFields;
  const filteredValues = values?.filter((value) => !excludedFields?.includes(value.name));
  const toggleCollapse = onToggleCollapse || toggleInternalIsCollapsed;

  const renderListItem = ({
    key,
    label,
    value,
    responseValue,
    isBooleanField,
  }: {
    key: string;
    label?: string;
    value: unknown;
    responseValue: string;
    isBooleanField: boolean;
  }) => {
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
          slotProps={{
            htmlInput: {
              readOnly: true,
            },
          }}
        />
      </ListItem>
    );
  };

  const renderDefault = (items: JsonFormValue[]) => (
    <List>
      {(collapseIsEnabled ? items.slice(0, collapseVisibleItemNumber) : items)?.map(({ label, value, type }, index) => {
        const key = `${index}-${label}-${value}`;
        const responseValue = checkValue(value);
        const isBooleanField = ["switch", "checkbox"]?.includes(type || "");

        return renderListItem({ isBooleanField, key, label, responseValue, value });
      })}

      {collapseIsEnabled && (
        <Collapse in={collapsed}>
          {items.slice(collapseVisibleItemNumber).map(({ label, value, type }, index) => {
            const key = `${collapseVisibleItemNumber + index}-${label}-${value}`;
            const responseValue = checkValue(value);
            const isBooleanField = ["switch", "checkbox"]?.includes(type || "");

            return renderListItem({ isBooleanField, key, label, responseValue, value });
          })}
        </Collapse>
      )}
    </List>
  );

  const renderCustom = (items: JsonFormValue[]) => (
    <>
      {/* Visible Items */}
      {items.slice(0, collapseIsEnabled ? collapseVisibleItemNumber : items.length).map((value, index) => {
        const key = `${index}-${value.label}-${value.value}`;
        return <div key={key}>{renderFields!(value)}</div>;
      })}
      {/* Collapse items */}
      {collapseIsEnabled && (
        <Collapse in={collapsed}>
          {items.slice(collapseVisibleItemNumber).map((value, index) => {
            const key = `${collapseVisibleItemNumber + index}-${value.label}-${value.value}`;
            return <div key={key}>{renderFields!(value)}</div>;
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
      {useCollapse && filteredValues && filteredValues.length > collapseVisibleItemNumber && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton onClick={toggleCollapse}>
            <SvgIcon viewBox="0 0 24 24" sx={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </SvgIcon>
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default TreegeViewer;
