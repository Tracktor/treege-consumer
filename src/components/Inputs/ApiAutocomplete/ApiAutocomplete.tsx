import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField } from "@tracktor/design-system";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import useApiAutoComplete from "@/components/Inputs/ApiAutocomplete/useApiAutoComplete";
import ChangeEventField from "@/types/ChangeEventField";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import adaptRouteResponseToOptions, { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import getSearch from "@/utils/getSearch/getSearch";

interface ApiAutocompleteProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  onChange?(dataAttribute: ChangeEventField): void;
  readOnly?: boolean;
  headers?: Headers;
  value?: unknown;
}

const ApiAutocomplete = ({ node, onChange, readOnly, inputRef, headers, value }: ApiAutocompleteProps, ref: Ref<unknown> | undefined) => {
  const [searchText, setSearchText] = useState<string>("");

  const { attributes, name, children } = node;
  const { type, label, required, route, helperText, initialQuery, isLeaf, isDecision } = attributes;
  const { reformatReturnAutocomplete } = useApiAutoComplete();

  const search = getSearch(route?.url || "", route?.searchKey || "", searchText, headers);

  const { data, isFetching, isError } = useQuery({
    enabled: !!searchText || !!initialQuery,
    queryFn: ({ signal }) => search(signal),
    queryKey: [name, searchText],
  });

  const options = adaptRouteResponseToOptions(data, route);

  const handleChange = (event: SyntheticEvent, newValue: string | Option | null) => {
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

  const handleSearchChange = (_: SyntheticEvent, value: string) => {
    setSearchText(value);
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
    <Autocomplete
      filterOptions={(o) => o}
      ref={ref}
      value={value}
      onChange={handleChange}
      options={options || []}
      onInputChange={handleSearchChange}
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
      loading={isFetching}
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
