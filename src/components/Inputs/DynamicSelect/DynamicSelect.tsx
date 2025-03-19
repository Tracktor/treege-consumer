import { Autocomplete, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Stack } from "@tracktor/design-system";
import { capitalize, isObject } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { forwardRef, Ref, SyntheticEvent } from "react";
import useDynamicSelect from "@/components/Inputs/DynamicSelect/useDynamicSelect";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";
import { FieldValues } from "@/types/FieldValues";
import { Headers } from "@/types/Headers";
import { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import safeGetObjectValueByKey from "@/utils/safeGetObjectValueByKey";

interface DynamicSelectProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  fieldValues?: FieldValues;
  headers?: Headers;
  value?: unknown;
  readOnly?: boolean;
  isParentFieldRequiredAndEmpty?: boolean;
  isIgnored?: boolean;
  helperText?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
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
  {
    inputRef,
    fieldValues,
    node,
    onChange,
    headers,
    readOnly,
    isParentFieldRequiredAndEmpty,
    isIgnored,
    helperText,
    error,
    value,
  }: DynamicSelectProps,
  ref: Ref<unknown> | undefined,
) => {
  const { attributes, children } = node;
  const { name, label, type, isLeaf, parentRef, isDecision, route, required, isMultiple, initialQuery } = attributes;

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

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>

      <Autocomplete
        readOnly={readOnly}
        multiple={isMultiple}
        ref={ref}
        value={isMultiple ? value || [] : value || null}
        onChange={handleChange}
        options={
          options || [
            {
              label: "a",
              value: "a",
            },
          ]
        }
        slots={{
          popper: isParentFieldRequiredAndEmpty ? () => null : undefined,
        }}
        noOptionsText="Aucune suggestion"
        isOptionEqualToValue={(option, val) => isObject(option) && "id" in option && isObject(val) && "id" in val && option?.id === val?.id}
        renderOption={({ id, ...props }, option, { index }) => {
          const optionImage = safeGetObjectValueByKey(option, "imageUri");
          const optionLabel = safeGetObjectValueByKey(option, "label");
          const key = `${index}-${String(id)}`;

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ListItem {...props} key={key} id={id}>
              {!!optionImage && (
                <ListItemAvatar>
                  <Avatar variant="square" alt={optionLabel} src={optionImage} sx={{ height: 30, width: 30 }} />
                </ListItemAvatar>
              )}
              <ListItemText primary={optionLabel} />
            </ListItem>
          );
        }}
        sx={{
          ...(isParentFieldRequiredAndEmpty && {
            pointerEvents: "none",
          }),
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            name={name}
            required={required}
            helperText={isParentFieldRequiredAndEmpty ? capitalize(`${parentRef} doit être doit être complété`) : helperText}
            inputRef={inputRef}
            error={error}
            slotProps={{
              input: {
                ...params.InputProps,
                readOnly,
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default forwardRef(DynamicSelect);
