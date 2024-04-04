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

  const checkIfObjectAsKey = (obj: unknown, key: string) => {
    if (typeof obj !== "object" || obj === null) {
      return "";
    }

    if (Object.keys(obj).includes(key)) {
      return obj[key as keyof typeof obj];
    }

    return "";
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
        renderOption={(props, option) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ListItem {...props}>
            {!!checkIfObjectAsKey(option, "img") && (
              <ListItemAvatar>
                <Avatar variant="square" alt={checkIfObjectAsKey(option, "label")} src={checkIfObjectAsKey(option, "img")} />
              </ListItemAvatar>
            )}
            <ListItemText primary={checkIfObjectAsKey(option, "label")} />
          </ListItem>
        )}
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
