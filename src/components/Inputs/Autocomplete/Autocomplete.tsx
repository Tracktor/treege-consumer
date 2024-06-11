import { Autocomplete as AutocompleteDS, Box, Grid, Stack, TextField, Typography } from "@tracktor/design-system";
import { isObject, useScript } from "@tracktor/react-utils";
import parse from "autosuggest-highlight/parse";
import { isArray, throttle } from "lodash-es";
import { forwardRef, Ref, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import useOptionsContext from "@/hooks/useOptionsContext";
import ChangeEventField from "@/types/ChangeEventField";
import TreeNode from "@/types/TreeNode";
import { IsString } from "@/types/TypeGuards";

type AutocompleteService = google.maps.places.AutocompleteService;

export interface AutocompleteProps {
  inputRef: Ref<unknown>;
  country?: string;
  value?: unknown;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  node: TreeNode;
  isIgnored?: boolean;
}

interface Match {
  offset: number;
  length: number;
}

const Autocomplete = (
  { value, inputRef, country, readOnly, onChange, node, isIgnored }: AutocompleteProps,
  ref: Ref<unknown> | undefined,
) => {
  const { attributes, children } = node;
  const { name, type, label, required, helperText, isLeaf, isDecision } = attributes;
  const { googleApiKey, countryAutocompleteService } = useOptionsContext();
  const autocompleteService = useRef<AutocompleteService>();
  const [options, setOptions] = useState<readonly unknown[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const places = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&loading=async&libraries=places&callback=Function.prototype`,
    {
      enable: !!googleApiKey || !isIgnored,
    },
  );

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: unknown | null) => {
    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value: newValue,
    });

    if (IsString(newValue)) return;
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
        autocompleteService?.current?.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    if (!googleApiKey || isIgnored) {
      return undefined;
    }

    let active = true;

    if (places === "loading") {
      return undefined;
    }

    if (!autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (searchText === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    const request = {
      componentRestrictions: {
        country: country ?? countryAutocompleteService,
      },
      input: searchText,
    };

    fetch(request, (results?: unknown[] | null) => {
      if (active) {
        let newOptions: readonly unknown[] = [];

        if (value) {
          newOptions = [value];
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
  }, [places, value, searchText, fetch, country, countryAutocompleteService, googleApiKey, isIgnored]);

  if (isIgnored) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="h5">{label}</Typography>
      <AutocompleteDS
        autoComplete
        includeInputInList
        filterSelectedOptions
        ref={ref}
        getOptionLabel={(option) => {
          if (IsString(option)) {
            return option;
          }

          return isObject(option) && "description" in option && IsString(option?.description) ? option?.description : "";
        }}
        filterOptions={(filterOptions) => filterOptions}
        options={options || []}
        value={value || null}
        onChange={handleChange}
        onBlur={handleOnBlurChange}
        onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
        readOnly={readOnly}
        renderInput={({ disabled, InputLabelProps, inputProps, InputProps }) => (
          <TextField
            fullWidth
            required={required}
            name={name}
            helperText={helperText}
            disabled={disabled}
            inputRef={inputRef}
            inputProps={inputProps} // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={InputProps}
            InputLabelProps={{
              ...InputLabelProps,
            }}
          />
        )}
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
            IsString(option?.structured_formatting?.main_text) &&
            option?.structured_formatting?.main_text;

          const optionSecondaryText =
            isObject(option) &&
            "structured_formatting" in option &&
            isObject(option.structured_formatting) &&
            "secondary_text" in option.structured_formatting &&
            IsString(option.structured_formatting.secondary_text) &&
            option.structured_formatting.secondary_text;

          const key = `${index}-${String(id)}`;
          const parts = parse(mainText || "", matches?.map((match: Match) => [match.offset, match.offset + match.length]));

          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <li {...props} key={key} id={id}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box sx={{ color: "text.secondary", height: 10, mr: 2, width: 10 }} />
                </Grid>
                <Grid item xs>
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
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </Stack>
  );
};

export default forwardRef(Autocomplete);
