import { Autocomplete, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Checkbox } from "@tracktor/design-system";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import { OriginData } from "@/components/Inputs/ApiAutocomplete/useApiAutoComplete";
import useDynamicSelect from "@/components/Inputs/DynamicSelect/useDynamicSelect";
import ChangeEventField from "@/types/ChangeEventField";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import adaptRouteResponseToOptions, { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

interface DynamicSelectProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  fieldValues?: JsonFormValue[] | unknown;
  onChange?(dataAttribute: ChangeEventField): void;
  headers?: Headers;
  value?: unknown;
  readOnly?: boolean;
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
  { inputRef, fieldValues, node, onChange, headers, value, readOnly }: DynamicSelectProps,
  ref: Ref<unknown> | undefined,
) => {
  // const [singleOption, setSingleOption] = useState<string>("");
  // const [multipleOptions, setMultipleOptions] = useState<string[]>([]);

  const { name, attributes, children } = node;
  const { label, type, isLeaf, parentRef, isDecision, route, required, isMultiple, initialQuery, helperText } = attributes;

  const { options } = useDynamicSelect({
    fieldValues,
    headers,
    initialQuery,
    name,
    parentRef,
    route,
  });

  const handleChange = (event: SyntheticEvent, newValue: string | Option | null) => {
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
  // options?.find((option) => option.id === value.id)
  return (
    <Autocomplete
      multiple={isMultiple}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      ref={ref}
      value={isMultiple ? value || [] : value || ""}
      onChange={handleChange}
      options={options}
      noOptionsText="Aucune suggestion"
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
  );
};

export default forwardRef(DynamicSelect);
