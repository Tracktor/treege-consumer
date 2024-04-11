import { Autocomplete, ListItem, ListItemAvatar, Avatar, ListItemText, TextField } from "@tracktor/design-system";
import { isObject } from "@tracktor/react-utils";
import { forwardRef, Ref, SyntheticEvent } from "react";
import ControlledTooltip from "@/components/DataDisplay/ControlledToolTip";
import useDynamicSelect from "@/components/Inputs/DynamicSelect/useDynamicSelect";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import safeGetObjectValueByKey from "@/utils/safeGetObjectValueByKey";

interface DynamicSelectProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  fieldValues?: FieldValues;
  onChange?(dataAttribute: ChangeEventField): void;
  headers?: Headers;
  value?: unknown;
  readOnly?: boolean;
  disabledChildrenField?: boolean;
}

/**
 * DynamicSelect component
 * @param treeValue
 * @param node
 * @param onChange
 * @param headers
 * @param ref
 * @constructor
 */
const DynamicSelect = (
  { inputRef, fieldValues, node, onChange, headers, value, readOnly, disabledChildrenField }: DynamicSelectProps,
  ref: Ref<unknown> | undefined,
) => {
  const { attributes, children } = node;
  const { name, label, type, isLeaf, parentRef, isDecision, route, required, isMultiple, initialQuery, helperText } = attributes;

  const { options } = useDynamicSelect({
    fieldValues,
    headers,
    initialQuery,
    name,
    parentRef,
    route,
  });

  const handleChange = (event: SyntheticEvent, newValue: string | Option | Option[] | string[] | null) => {
    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value: newValue,
    });
  };

  return (
    <ControlledTooltip parentRef={label} title={name} disabled={disabledChildrenField}>
      <Autocomplete
        readOnly={readOnly}
        multiple={isMultiple}
        isOptionEqualToValue={(option, val) => isObject(option) && "id" in option && isObject(val) && "id" in val && option?.id === val?.id}
        ref={ref}
        value={isMultiple ? value || [] : value || ""}
        onChange={handleChange}
        options={options || []}
        noOptionsText="Aucune suggestion"
        disabled={disabledChildrenField}
        renderOption={(props, option) => {
          const optionImage = safeGetObjectValueByKey(option, "imageUri");
          const optionLabel = safeGetObjectValueByKey(option, "label");

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ListItem {...props}>
              {!!optionImage && (
                <ListItemAvatar>
                  <Avatar variant="square" alt={optionLabel} src={optionImage} sx={{ height: 30, width: 30 }} />
                </ListItemAvatar>
              )}
              <ListItemText primary={optionLabel} />
            </ListItem>
          );
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label={label}
            name={name}
            required={required}
            helperText={helperText}
            inputRef={inputRef}
            InputProps={{
              ...params.InputProps,
              readOnly,
            }}
          />
        )}
      />
    </ControlledTooltip>
  );
};

export default forwardRef(DynamicSelect);
