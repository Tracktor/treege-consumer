import {
  Autocomplete as AutocompleteDS,
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@tracktor/design-system";
import { addressToString, isObject, isString, useScript } from "@tracktor/react-utils";
import type { TreeNode } from "@tracktor/types-treege";
import parse from "autosuggest-highlight/parse";
import { isArray, throttle } from "lodash-es";
import { forwardRef, Ref, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import InputLabel from "@/components/Inputs/InputLabel";
import ChangeEventField from "@/types/ChangeEventField";
import addressToGoogleAutocompleteAdapter from "@/utils/addressToGoogleAutocompleteAdapter/addressToGoogleAutocompleteAdapter";

type AutocompleteService = google.maps.places.AutocompleteService;
type OptionsRecord = Record<string, unknown>;

interface AddressAdapterParams {
  streetNumber?: string | number | null;
  route?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
}

const ancestorHasOptions = (obj: unknown): obj is { options: unknown } => typeof obj === "object" && obj !== null && "options" in obj;
const isAddressAdapterParams = (obj: unknown): obj is AddressAdapterParams => {
  if (typeof obj !== "object" || obj === null) return false;
  return "street" in obj && "city" in obj && "postalCode" in obj;
};

export interface AutocompleteProps {
  inputRef: Ref<unknown>;
  country?: string | string[];
  value?: unknown;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  node: TreeNode;
  isIgnored?: boolean;
  googleApiKey?: string;
  helperText?: string;
  pattern?: string;
  patternMessage?: string;
  error?: boolean;
  ancestorValue?: unknown;
  ancestorMapping?: string;
}

interface Match {
  offset: number;
  length: number;
}

const Address = (
  {
    value,
    inputRef,
    country,
    readOnly,
    onChange,
    node,
    isIgnored,
    googleApiKey,
    error,
    pattern,
    patternMessage,
    helperText,
    ancestorValue,
    ancestorMapping,
  }: AutocompleteProps,
  ref: Ref<unknown> | undefined,
) => {
  const { attributes, children } = node;
  const { name, type, label, required, isLeaf, isDecision } = attributes;
  const autocompleteService = useRef<AutocompleteService>();
  const [options, setOptions] = useState<readonly unknown[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const apiAncestorFull = ancestorHasOptions(ancestorValue) ? ancestorValue : undefined;
  const ancestorValueMapped = ancestorMapping ? (apiAncestorFull as OptionsRecord)?.[ancestorMapping] : undefined;
  const [localValue, setLocalValue] = useState<unknown | null>(value || null);

  // worksite with address = L15EN TUNNEL - EXBY.L15EN92961

  const lastAncestorRef = useRef(ancestorValueMapped);

  const places = useScript(`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&loading=async&libraries=places`, {
    enable: !!googleApiKey && !isIgnored,
    position: "head-end",
  });

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: unknown | null) => {
    setLocalValue(newValue);

    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value: newValue,
    });

    if (isString(newValue)) return;
    setOptions(newValue ? [newValue, ...options] : options);
  };

  const handleOnBlurChange = () => {
    if (!options.length || !value) {
      onChange?.({
        children,
        event: undefined,
        isDecision,
        isLeaf,
        name,
        type,
        value: searchText,
      });
    }
  };

  const fetch = useMemo(
    () =>
      throttle((request: { input: string }, callback: (results: unknown[] | null) => void) => {
        setIsFetching(true);
        autocompleteService?.current?.getPlacePredictions(request, (results) => {
          callback(results);
          setIsFetching(false);
        });
      }, 200),
    [],
  );

  useEffect(() => {
    if (!googleApiKey || isIgnored) {
      return undefined;
    }

    let active = true;

    if (places === "loading" || !window?.google || !window.google?.maps || !window.google.maps?.places) {
      return undefined;
    }

    if (!autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (searchText === "") {
      setIsFetching(false);
      setOptions(localValue ? [localValue] : []);
      return undefined;
    }

    const request = {
      componentRestrictions: {
        country,
      },
      input: searchText,
    };

    fetch(request, (results?: unknown[] | null) => {
      if (active) {
        let newOptions: readonly unknown[] = [];

        if (localValue) {
          newOptions = [localValue];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [country, fetch, googleApiKey, isIgnored, localValue, places, searchText]);

  useEffect(() => {
    if (ancestorValueMapped !== lastAncestorRef.current) {
      lastAncestorRef.current = ancestorValueMapped;

      const updatedAddress = addressToGoogleAutocompleteAdapter(ancestorValueMapped);
      const updatedAddressString = isAddressAdapterParams(ancestorValueMapped) ? addressToString(ancestorValueMapped) : "";

      setLocalValue(updatedAddress);
      setSearchText(updatedAddressString);

      onChange?.({
        children,
        event: undefined,
        isDecision,
        isLeaf,
        name,
        type,
        value: ancestorValueMapped,
      });
    }
  }, [ancestorValueMapped, children, isDecision, isLeaf, name, onChange, type]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <InputLabel required={required}>{label}</InputLabel>
      <AutocompleteDS
        freeSolo
        filterSelectedOptions
        ref={ref}
        filterOptions={(filterOptions) => filterOptions}
        options={options || []}
        value={localValue}
        onChange={handleChange}
        onBlur={handleOnBlurChange}
        onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
        readOnly={readOnly}
        getOptionLabel={(option) => {
          if (isString(option)) {
            return option;
          }

          return isObject(option) && "description" in option && isString(option?.description) ? option?.description : "";
        }}
        renderInput={({ disabled, InputLabelProps, inputProps, InputProps }) => {
          const { endAdornment, ...InputPropsWithoutEndAdornment } = InputProps;

          return (
            <TextField
              fullWidth
              required={required}
              name={name}
              helperText={helperText}
              disabled={disabled}
              inputRef={inputRef}
              error={error}
              slotProps={{
                htmlInput: {
                  ...inputProps,
                  autoComplete: "off",
                  pattern,
                  title: patternMessage,
                },
                input: {
                  endAdornment: isFetching ? (
                    <InputAdornment position="end">
                      <CircularProgress color="inherit" size={20} />
                    </InputAdornment>
                  ) : (
                    endAdornment
                  ),
                  ...InputPropsWithoutEndAdornment,
                },
                inputLabel: InputLabelProps,
              }}
            />
          );
        }}
        renderOption={({ id, ...props }, option, { index }) => {
          const matches =
            (isObject(option) &&
              "structured_formatting" in option &&
              isObject(option?.structured_formatting) &&
              "main_text_matched_substrings" in option.structured_formatting &&
              isArray(option?.structured_formatting?.main_text_matched_substrings) &&
              option?.structured_formatting?.main_text_matched_substrings) ||
            [];

          const mainText =
            isObject(option) &&
            "structured_formatting" in option &&
            isObject(option.structured_formatting) &&
            "main_text" in option.structured_formatting &&
            isString(option?.structured_formatting?.main_text) &&
            option?.structured_formatting?.main_text;

          const optionSecondaryText =
            isObject(option) &&
            "structured_formatting" in option &&
            isObject(option.structured_formatting) &&
            "secondary_text" in option.structured_formatting &&
            isString(option.structured_formatting.secondary_text) &&
            option.structured_formatting.secondary_text;

          const key = `${index}-${String(id)}`;
          const parts = parse(mainText || "", matches?.map((match: Match) => [match.offset, match.offset + match.length]));

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <li {...props} key={key} id={id}>
              <Box>
                {parts.map((part, i) => {
                  const placeId = isObject(option) && "place_id" in option && option.place_id;
                  const keyId = `${placeId}-${i}`;

                  return (
                    <Typography
                      variant="body1"
                      component="span"
                      key={keyId}
                      sx={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </Typography>
                  );
                })}
                <Typography variant="body2" color="text.secondary">
                  {optionSecondaryText}
                </Typography>
              </Box>
            </li>
          );
        }}
      />
    </Stack>
  );
};

export default forwardRef(Address);
