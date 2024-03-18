import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField } from "@tracktor/design-system";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import adaptRouteResponseToOptions from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import getSearch from "@/utils/getSearch/getSearch";

interface ApiAutocompleteProps {
  inputRef: Ref<any>;
  node: TreeNode;
  onChange?(dataAttribute: ChangeEventField): void;
  defaultValue?: unknown;
  readOnly?: boolean;
  headers?: Headers;
}

const ApiAutocomplete = ({ node, onChange, readOnly, inputRef, headers }: ApiAutocompleteProps, ref: Ref<unknown> | undefined) => {
  const { attributes, name, children } = node;
  const { type, label, required, route, helperText, initialQuery, isLeaf, isDecision } = attributes;
  const [searchText, setSearchText] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | string[]>();

  const search = getSearch(route?.url || "", route?.searchKey || "", searchText, headers);

  const { data, isFetching, isError } = useQuery({
    enabled: !!searchText || !!initialQuery,
    queryFn: ({ signal }) => search(signal),
    queryKey: [name, searchText],
  });

  const options = adaptRouteResponseToOptions(data, route);

  const handleChange = (event: SyntheticEvent, value: string | string[]) => {
    setSelectedValue(value);
    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value: value || [],
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
      value={selectedValue}
      options={options || []}
      onInputChange={handleSearchChange}
      // defaultValue={defaultValue}
      // noOptionsText="Aucune suggestion"
      onChange={handleChange}
      // isOptionEqualToValue={(option, value) => checkIfObjectAsKey(option, "value") === checkIfObjectAsKey(value, "value")}
      // getOptionLabel={(option) => checkIfObjectAsKey(option, "label") || ""}
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
