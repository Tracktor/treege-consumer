import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField } from "@tracktor/design-system";
import { useDebounce } from "@tracktor/react-utils";
import { forwardRef, Ref, SyntheticEvent, useCallback, useState } from "react";
import type { ChangeEventField } from "@/features/TreegeConsumer/type";
import { TreeNode } from "@/types/TreeNode";

export interface AutocompleteOption {
  label: string;
  value: string;
  img?: string;
}

interface ApiAutocompleteProps {
  inputRef: Ref<any>;
  node: TreeNode;
  onChange?(dataAttribute: ChangeEventField): void;
  defaultValue?: AutocompleteOption;
  readOnly?: boolean;
}

const getSearch = (url: string, searchKey: string, value: string) =>
  fetch(`${url}?${searchKey}=${value}`, {
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwiZW50aXR5X2lkIjoyLCJleHAiOjE3MDU1OTExNzZ9.-v5hRDHdckQaPQsXwpIvyfrCrcaiR-TG6R3hkmu9Xfg",
    },
  }).then((r) => r.json());

const ApiAutocomplete = ({ node, onChange, defaultValue, readOnly, inputRef }: ApiAutocompleteProps, ref: Ref<unknown> | undefined) => {
  const { attributes, name } = node;
  const { type, label, required, route, helperText } = attributes;

  const handleChange = useCallback(
    (event: SyntheticEvent, value: AutocompleteOption | null) => {
      if (!value) return;
      onChange?.({ event, name, type, value });
    },
    [name, onChange, type],
  );

  const [inputValue, setInputValue] = useState("");
  const debounceSearch = useDebounce(inputValue, 300);

  const { data, isError, isLoading } = useQuery<unknown, unknown, AutocompleteOption[]>({
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
        (item) => typeof item === "object" && item !== null && typeof item.label === "string" && typeof item.value !== "string",
      );
      if (!isValid) {
        console.warn(
          "Attention : la réponse attendu pour la consumer n'est pas valide ! Elle doit être de format {label: string; value:string; img?:string}[]",
        );
      }
    } else {
      console.warn(
        "Attention : la réponse attendu pour la consumer n'est pas valide ! Elle doit être de format {label: string; value:string; img?:string}[]",
      );
    }
  }

  return (
    <Autocomplete
      filterOptions={(o) => o}
      ref={ref}
      options={data || []}
      onInputChange={handleInputChange}
      defaultValue={defaultValue}
      noOptionsText="Aucune suggestion"
      onChange={(event, value) => handleChange(event, value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ListItem {...props}>
          {option?.img && (
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt={option.label}
                src="https://assets-global.website-files.com/62987134cee3f41ed59eeb9d/6374bbbae94f94c5f3b9108f_62b5dd2e7c7da80f1ee46297_3526-min.jpeg"
              />
            </ListItemAvatar>
          )}
          <ListItemText primary={option.label} />
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
