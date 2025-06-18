import { useQuery } from "@tanstack/react-query";
import { Stack, Select, MenuItem, FormHelperText, SelectChangeEvent } from "@tracktor/design-system";
import { isString } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import { Ref, useEffect, useRef } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";
import { DetailFieldValues } from "@/types/FieldValues";
import adaptRouteResponseToOptions, { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import paramsBuilder from "@/utils/paramsBuilder/paramsBuilder";
import requestFetcher from "@/utils/requestFetcher/requestFetcher";
import urlBuilder from "@/utils/urlBuilder/urlBuilder";

const getSafeValue = (value: string | Option | null | undefined, options?: Option[]): string => {
  const valueStr = typeof value === "object" && value !== null ? value.value : value;
  return typeof isString(valueStr) && options?.some((opt) => opt?.value === valueStr) ? String(valueStr) : "";
};

interface DynamicSelectProps {
  inputRef: Ref<unknown>;
  node: TreeNode;
  headers?: HeadersInit;
  value?: Option | null;
  readOnly?: boolean;
  isParentFieldRequiredAndEmpty?: boolean;
  isIgnored?: boolean;
  helperText?: string;
  error?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  detailFieldValues?: DetailFieldValues[];
}

/**
 * DynamicSelect component
 * @param treeValue
 * @param node
 * @param onChange
 * @param headers
 * @constructor
 */
const DynamicSelect = ({
  inputRef,
  node,
  onChange,
  headers,
  readOnly,
  isParentFieldRequiredAndEmpty,
  isIgnored,
  helperText,
  error,
  value,
  detailFieldValues,
}: DynamicSelectProps) => {
  const urlRef = useRef<string>();
  const { attributes, children } = node;
  const { name, label, type, isLeaf, isDecision, route, required, isMultiple, initialQuery } = attributes;
  const { params, url } = route || {};
  const apiParams = paramsBuilder({ detailFieldValues, params });
  const dynamicUrl = urlBuilder({ detailFieldValues, params, url });
  const hasAllResolvedPlaceholders = !/\{[^}]+}/.test(dynamicUrl);

  const fetchData = requestFetcher({
    additionalParams: apiParams,
    headers,
    url: dynamicUrl || "",
  });

  const { data, isError, isLoading } = useQuery({
    enabled: initialQuery || hasAllResolvedPlaceholders,
    queryFn: ({ signal }) => fetchData(signal),
    queryKey: [name, JSON.stringify(apiParams), dynamicUrl],
  });

  const addValueToOptions = (options?: Option[] | null, inputValue?: Option | string | null): Option[] => {
    if (!inputValue) return options ?? [];

    const inputValueObj =
      typeof inputValue === "object" ? inputValue : { id: String(inputValue), label: String(inputValue), value: String(inputValue) };

    const exists = options?.some((opt) => opt?.value === inputValueObj.value);

    if (exists) {
      return options ?? [];
    }

    return [...(options ?? []), inputValueObj];
  };

  const options = adaptRouteResponseToOptions(data, route);
  const optionsWithValues = addValueToOptions(options, value);
  const uniqueOptions = optionsWithValues?.filter(
    (opt, index, self) => opt?.value && index === self.findIndex((o) => o?.value === opt?.value),
  );

  const handleChange = (event: SelectChangeEvent) => {
    const findSelectedRawData = optionsWithValues?.find((opt) => opt.value === event.target.value);

    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      rawData: findSelectedRawData?.rawData,
      type,
      value: event.target.value,
    });
  };

  // if there are only one option and the select is not readOnly, automatically select it
  useEffect(() => {
    const hasUrlChanged = urlRef.current !== dynamicUrl;
    urlRef.current = dynamicUrl;

    const singleOption = !readOnly && !value && uniqueOptions?.length === 1 ? uniqueOptions[0] : null;
    const shouldReset = hasUrlChanged;
    const shouldAutoSelect = !hasUrlChanged && singleOption;

    if (!shouldReset && !shouldAutoSelect) return;

    const nextValue = shouldReset ? "" : singleOption!.value;
    const nextRawData = shouldReset ? null : singleOption!.rawData;

    onChange?.({
      children,
      event: { target: { value: nextValue } } as SelectChangeEvent,
      isDecision,
      isLeaf,
      name,
      rawData: nextRawData,
      type,
      value: nextValue,
    });
  }, [children, dynamicUrl, isDecision, isLeaf, name, onChange, readOnly, type, uniqueOptions, value]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        name={name}
        value={getSafeValue(value, uniqueOptions)}
        onChange={handleChange}
        multiple={isMultiple}
        displayEmpty
        inputRef={inputRef}
        readOnly={readOnly}
        error={error || isError}
        disabled={isParentFieldRequiredAndEmpty || isLoading || isError}
        renderValue={(selected) => optionsWithValues?.find((opt) => opt.id === selected)?.label ?? ""}
      >
        {uniqueOptions?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        {uniqueOptions?.length === 0 && (
          <MenuItem disabled value="">
            No options available
          </MenuItem>
        )}
      </Select>
      {isLoading && <FormHelperText>Loading...</FormHelperText>}
      {helperText && <FormHelperText error={error || isError}>{helperText}</FormHelperText>}
    </Stack>
  );
};

export default DynamicSelect;
