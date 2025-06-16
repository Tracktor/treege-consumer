import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from "@tracktor/design-system";
import { useDebounce } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";
import { TreeFieldValues } from "@/types/FieldValues";
import adaptRouteResponseToOptions, { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import paramsBuilder from "@/utils/paramsBuilder/paramsBuilder";
import searchResultsFetcher from "@/utils/requestFetcher/requestFetcher";
import safeGetObjectValueByKey from "@/utils/safeGetObjectValueByKey/safeGetObjectValueByKey";

interface ApiAutocompleteProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  onChange?(dataAttribute: ChangeEventField): void;
  readOnly?: boolean;
  headers?: HeadersInit;
  value?: Option | null;
  isIgnored?: boolean;
  prefixResponseImageUriAutocomplete?: string;
  helperText?: string;
  error?: boolean;
  treeFieldValues?: TreeFieldValues[];
}

const ApiAutocomplete = (
  {
    node,
    onChange,
    readOnly,
    inputRef,
    headers,
    value,
    isIgnored,
    prefixResponseImageUriAutocomplete,
    error,
    helperText,
    treeFieldValues,
  }: ApiAutocompleteProps,
  ref?: Ref<unknown>,
) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 150);
  const { attributes, children } = node;
  const { type, name, label, required, route, initialQuery, isLeaf, isDecision } = attributes;
  const { params, url, searchKey } = route || {};
  const apiParams = paramsBuilder({ params, treeFieldValues });

  const addValueToOptions = (options?: Option[] | null, inputValue?: Option | null) => {
    if (!inputValue) {
      return options;
    }

    return typeof inputValue === "object" ? [inputValue, ...(options || [])] : [{ value: inputValue }, ...(options || [])];
  };

  const search = searchResultsFetcher({
    additionalParams: apiParams,
    headers,
    searchKey: searchKey || "",
    searchValue: debouncedSearchValue,
    url: url || "",
  });

  const { data, isFetching, isError } = useQuery({
    enabled: !!debouncedSearchValue || !!initialQuery,
    queryFn: ({ signal }) => search(signal),
    queryKey: [name, debouncedSearchValue, JSON.stringify(apiParams)],
  });

  const options = adaptRouteResponseToOptions(data, route);
  const optionsWithValues = addValueToOptions(options, value); // We add the value to the options to avoid warnings because the value is not in the options

  const handleChange = (event: SyntheticEvent, newValue: Option | null) => {
    const { rawData, ...valueWithoutRawData } = newValue ?? {};

    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      rawData,
      type,
      value: valueWithoutRawData,
    });
  };

  const handleSearchChange = (_: SyntheticEvent, fieldValue: string) => {
    setSearchValue(fieldValue);
  };

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
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
          const logo = optionImage ? `${prefixResponseImageUriAutocomplete}${optionImage}` : undefined;

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ListItem {...props} key={key} id={id}>
              <ListItemAvatar>
                <Avatar variant="rounded" alt={optionLabel} src={logo} sx={{ height: 30, width: 30 }} />
              </ListItemAvatar>
              <ListItemText primary={optionLabel} />
            </ListItem>
          );
        }}
        renderInput={(renderParams) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...renderParams}
            name={name}
            required={required}
            helperText={helperText}
            inputRef={inputRef}
            error={isError || error}
            slotProps={{
              input: {
                ...renderParams.InputProps,
                readOnly,
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default forwardRef(ApiAutocomplete);
