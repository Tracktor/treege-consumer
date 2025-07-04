import { useQuery } from "@tanstack/react-query";
import { Autocomplete, Avatar, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from "@tracktor/design-system";
import { getObjectValue, isObject, isString, useDebounce } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";
import { DetailFieldValues } from "@/types/FieldValues";
import adaptRouteResponseToOptions, { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import paramsBuilder from "@/utils/paramsBuilder/paramsBuilder";
import requestFetcher from "@/utils/requestFetcher/requestFetcher";
import urlBuilder from "@/utils/urlBuilder/urlBuilder";

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
  detailFieldValues?: DetailFieldValues[];
}

const isPlainEmptyObject = (val: unknown): boolean => {
  if (val === null || val === undefined) return true;
  return isObject(val) && !Array.isArray(val) && val.constructor === Object && Object.keys(val).length === 0;
};

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
    detailFieldValues,
  }: ApiAutocompleteProps,
  ref?: Ref<unknown>,
) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 150);
  const { attributes, children } = node;
  const { type, name, label, required, route, initialQuery, isLeaf, isDecision } = attributes;
  const { params, url, searchKey } = route || {};
  const apiParams = paramsBuilder({ detailFieldValues, params });
  const dynamicUrl = urlBuilder({ detailFieldValues, params, url });
  const hasUnresolvedPlaceholders = !/\{[^}]+}/.test(dynamicUrl);

  const addValueToOptions = (options?: Option[] | null, inputValue?: Option | null) => {
    if (!inputValue) {
      return options;
    }

    return isObject(inputValue) ? [inputValue, ...(options || [])] : [{ value: inputValue }, ...(options || [])];
  };

  const search = requestFetcher({
    additionalParams: apiParams,
    headers,
    searchKey: searchKey || "",
    searchValue: debouncedSearchValue,
    url: dynamicUrl || "",
  });

  const { data, isFetching, isError } = useQuery({
    enabled: !!debouncedSearchValue || !!initialQuery || hasUnresolvedPlaceholders,
    queryFn: ({ signal }) => search(signal),
    queryKey: [name, debouncedSearchValue, JSON.stringify(apiParams), url],
  });

  const options = adaptRouteResponseToOptions(data, route);
  const optionsWithValues = addValueToOptions(options, value); // We add the value to the options to avoid warnings because the value is not in the options

  const handleChange = (event: SyntheticEvent, newValue: Option | null) => {
    const isEmptyObject = isPlainEmptyObject(newValue);

    const { rawData, ...valueWithoutRawData } = newValue ?? {};

    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      rawData,
      type,
      value: isEmptyObject ? "" : valueWithoutRawData,
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
          const optionImage = getObjectValue(option, "imageUri");
          const optionLabel = getObjectValue(option, "label");
          const key = `${option?.id}-${option.label}-${index}-${String(id)}`;
          const logo = optionImage ? `${prefixResponseImageUriAutocomplete}${optionImage}` : undefined;

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ListItem {...props} key={key} id={id}>
              <ListItemAvatar>
                <Avatar variant="rounded" alt={optionLabel} src={logo} sx={{ height: 30, width: 30 }} />
              </ListItemAvatar>
              <ListItemText primary={isString(optionLabel) ? optionLabel : ""} />
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
