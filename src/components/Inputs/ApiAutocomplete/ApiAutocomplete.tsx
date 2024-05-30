import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField } from "@tracktor/design-system";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import useApiAutoComplete from "@/components/Inputs/ApiAutocomplete/useApiAutoComplete";
import useOptionsContext from "@/hooks/useOptionsContext";
import ChangeEventField from "@/types/ChangeEventField";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import adaptRouteResponseToOptions, { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import getSearch from "@/utils/getSearch/getSearch";
import safeGetObjectValueByKey from "@/utils/safeGetObjectValueByKey";

interface ApiAutocompleteProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  onChange?(dataAttribute: ChangeEventField): void;
  readOnly?: boolean;
  headers?: Headers;
  value?: Option | null;
  isIgnored?: boolean;
}

const ApiAutocomplete = (
  { node, onChange, readOnly, inputRef, headers, value, isIgnored }: ApiAutocompleteProps,
  ref: Ref<unknown> | undefined,
) => {
  const [searchText, setSearchText] = useState<string>("");
  const { attributes, children } = node;
  const { type, name, label, required, route, helperText, initialQuery, isLeaf, isDecision } = attributes;
  const { prefixResponseImageUriAutocomplete } = useOptionsContext();
  const { reformatReturnAutocomplete, addValueToOptions } = useApiAutoComplete();
  const search = getSearch(route?.url || "", route?.searchKey || "", searchText, headers);

  const { data, isFetching, isError } = useQuery({
    enabled: !!searchText || !!initialQuery,
    queryFn: ({ signal }) => search(signal),
    queryKey: [name, searchText],
  });

  const options = adaptRouteResponseToOptions(data, route);
  const optionsWithValues = addValueToOptions(options, value); // We add the value to the options to avoid warnings because the value is not in the options

  const handleChange = (event: SyntheticEvent, newValue: Option | null) => {
    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value: reformatReturnAutocomplete(newValue),
    });
  };

  const handleSearchChange = (_: SyntheticEvent, fieldValue: string) => {
    setSearchText(fieldValue);
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Autocomplete
      filterSelectedOptions
      readOnly={readOnly}
      filterOptions={(o) => o}
      ref={ref}
      value={value || null}
      onChange={handleChange}
      loading={isFetching}
      options={optionsWithValues || []}
      onInputChange={handleSearchChange}
      noOptionsText="Aucune suggestion"
      isOptionEqualToValue={(option, optionValue) => {
        if (!optionValue) {
          return false;
        }

        if (option?.id === optionValue?.id) {
          return true;
        }

        return option?.value === optionValue?.value;
      }}
      renderOption={({ id, ...props }, option, { index }) => {
        const optionImage = safeGetObjectValueByKey(option, "imageUri");
        const optionLabel = safeGetObjectValueByKey(option, "label");
        const key = `${option?.id}-${option.label}-${index}-${String(id)}`;

        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ListItem {...props} key={key} id={id}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={optionLabel}
                src={optionImage ? prefixResponseImageUriAutocomplete + optionImage : optionLabel}
                sx={{ height: 30, width: 30 }}
              />
            </ListItemAvatar>
            <ListItemText primary={optionLabel} />
          </ListItem>
        );
      }}
      renderInput={(params) => (
        // const { InputProps, size, InputLabelProps, disabled, id, inputProps, fullWidth } = params;
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
            endAdornment: isFetching && <CircularProgress color="inherit" size={20} />,
            error: isError,
            readOnly,
          }}
        />
      )}
    />
  );
};

export default forwardRef(ApiAutocomplete);
