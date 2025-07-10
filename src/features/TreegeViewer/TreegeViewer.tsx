import {
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  TextField,
  IconButton,
  SvgIcon,
  Box,
  SxProps,
} from "@tracktor/design-system";
import { isObject, isString, useToggle } from "@tracktor/react-utils";
import { CSSProperties, Fragment, ReactElement } from "react";
import { JsonFormValue } from "@/types/JsonFormValue";

export interface TreegeViewerProps<T = unknown> {
  /**
   * Json form value
   */
  values?: T | JsonFormValue[] | null;
  /**
   * Array of field name that we want to ignore (replaces `ignoreFields`)
   * @d
   */
  excludedFields?: string[];
  /**
   * Filter hidden fields or not
   * @default true
   */
  filterHiddenFields?: boolean;
  /**
   * Enable internal collapse or not
   */
  useCollapse?: boolean;
  /**
   * Number of visible items before collapse
   */
  collapseVisibleItemNumber?: number;
  /**
   * Collapsed state
   */
  isCollapsed?: boolean;
  /**
   * Function triggered when collapse is toggled
   * Only triggers when "useCollapse" is true
   */
  onToggleCollapse?: () => void;
  /**
   * Custom style for the collapse
   */
  collapseStyle?: CSSProperties;
  /**
   * Custom sx for the collapse
   */
  collapseSx?: SxProps;
  /**
   * Custom style for the collapse
   */
  style?: CSSProperties;
  /**
   *  Style sx
   */
  sx?: SxProps;
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
  style,
  sx,
  collapseStyle,
  collapseSx,
  filterHiddenFields = true,
  collapseVisibleItemNumber = 4,
}: TreegeViewerProps) => {
  const [internalIsCollapsed, toggleInternalIsCollapsed] = useToggle(false);
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalIsCollapsed;
  const collapseIsEnabled = useCollapse || isCollapsed !== undefined;
  const isCustomRenderInput = values && renderFields;

  const filteredValues = Array.isArray(values)
    ? values
        ?.filter((value) => !excludedFields?.includes(value.name)) // Filter out excluded fields
        .filter((value) => (filterHiddenFields ? value.type !== "hidden" : true)) // Filter hidden fields if filterHiddenFields is true
    : undefined;

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
      {(collapseIsEnabled ? items?.slice(0, collapseVisibleItemNumber) : items)?.map(({ label, value, type }, index) => {
        const key = `${index}-${label}-${value}`;
        const responseValue = checkValue(value);
        const isBooleanField = ["switch", "checkbox"]?.includes(type || "");

        return renderListItem({ isBooleanField, key, label, responseValue, value });
      })}

      {collapseIsEnabled && (
        <Collapse in={collapsed} style={collapseStyle} sx={collapseSx} component={Box}>
          {items?.slice(collapseVisibleItemNumber).map(({ label, value, type }, index) => {
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
      {items?.slice(0, collapseIsEnabled ? collapseVisibleItemNumber : items.length).map((value, index) => {
        const key = `${index}-${value.label}-${value.value}`;
        return <Fragment key={key}>{renderFields!(value)}</Fragment>;
      })}
      {/* Collapse items */}
      {collapseIsEnabled && (
        <Collapse in={collapsed} style={collapseStyle} sx={collapseSx}>
          {items?.slice(collapseVisibleItemNumber).map((value, index) => {
            const key = `${collapseVisibleItemNumber + index}-${value.label}-${value.value}`;
            return <Fragment key={key}>{renderFields!(value)}</Fragment>;
          })}
        </Collapse>
      )}
    </>
  );

  return (
    <>
      {/* Render */}
      <Box style={style} sx={sx}>
        {isCustomRenderInput ? renderCustom(filteredValues!) : renderDefault(filteredValues!)}
      </Box>

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
