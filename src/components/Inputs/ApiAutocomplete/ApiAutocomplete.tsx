import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField } from "@tracktor/design-system";
import { useDebounce } from "@tracktor/react-utils";
import { forwardRef, Ref, SyntheticEvent, useCallback, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import { TreeNode } from "@/types/TreeNode";

interface ApiAutocompleteProps {
  inputRef: Ref<any>;
  node: TreeNode;
  onChange?(dataAttribute: ChangeEventField): void;
  defaultValue?: unknown;
  readOnly?: boolean;
}

const getSearch = (url: string, searchKey: string, value: string) => fetch(`${url}?${searchKey}=${value}`).then((r) => r.json());

const ApiAutocomplete = ({ node, onChange, defaultValue, readOnly, inputRef }: ApiAutocompleteProps, ref: Ref<unknown> | undefined) => {
  const { attributes, name } = node;
  const { type, label, required, route, helperText } = attributes;

  const handleChange = useCallback(
    (event: SyntheticEvent, value: unknown) => {
      if (value !== null && typeof value === "object" && Object.keys(value).includes("label") && Object.keys(value).includes("value")) {
        onChange?.({ event, name, type, value });
      }
    },
    [name, onChange, type],
  );

  const [inputValue, setInputValue] = useState("");
  const debounceSearch = useDebounce(inputValue, 300);

  const { data, isError, isLoading } = useQuery<unknown, unknown, unknown[]>({
    enabled: !!debounceSearch,
    queryFn: () => getSearch(route?.url || "", route?.searchKey || "", debounceSearch),
    queryKey: ["search", debounceSearch],
  });

  const handleInputChange = useCallback((_: SyntheticEvent, value: string) => {
    setInputValue(value);
  }, []);

  if (data) {
    if (Array.isArray(data)) {
      // Check if data is an array of objects with label and value
      const isValid = data.every(
        (item) => typeof item === "object" && item !== null && Object.keys(item).includes("label") && Object.keys(item).includes("value"),
      );
      if (!isValid) {
        console.warn(
          "Warning: The expected response for the consumer is not valid! It must be in the format: {label: string; value:string; img?:string}[]",
        );
      }
    } else {
      console.warn(
        "Warning: The expected response for the consumer is not valid! It must be in the format: {label: string; value:string; img?:string}[]",
      );
    }
  }

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
      options={Array.isArray(data) ? data : []}
      onInputChange={handleInputChange}
      defaultValue={defaultValue}
      noOptionsText="Aucune suggestion"
      onChange={(event, value) => handleChange(event, value)}
      isOptionEqualToValue={(option, value) => checkIfObjectAsKey(option, "value") === checkIfObjectAsKey(value, "value")}
      getOptionLabel={(option) => checkIfObjectAsKey(option, "label") || ""}
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
      loading={isLoading}
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
            endAdornment: isLoading && <CircularProgress color="inherit" size={20} />,
            error: isError,
            readOnly,
          }}
        />
      )}
    />
  );
};

export default forwardRef(ApiAutocomplete);
