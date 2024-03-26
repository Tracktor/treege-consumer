import { Autocomplete as AutocompleteDS, Box, Grid, TextField, Typography } from "@tracktor/design-system";
import { useScript } from "@tracktor/react-utils";
import parse from "autosuggest-highlight/parse";
import { throttle } from "lodash-es";
import { forwardRef, Ref, SyntheticEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import OptionsContext from "@/context/Options/OptionsContext";
import ChangeEventField from "@/types/ChangeEventField";
import TreeNode from "@/types/TreeNode";
import { IsString } from "@/types/TypeGuards";

export interface AutocompleteProps {
  inputRef: Ref<unknown>;
  country?: string;
  defaultValue?: unknown;
  readOnly?: boolean;
  onChange?(dataAttribute: ChangeEventField): void;
  node: TreeNode;
}

interface Match {
  offset: number;
  length: number;
}

type AutocompleteService = google.maps.places.AutocompleteService;
type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const Autocomplete = ({ defaultValue, inputRef, country, readOnly, onChange, node }: AutocompleteProps, ref: Ref<unknown> | undefined) => {
  const { attributes, name, children } = node;
  const { type, label, required, helperText, isLeaf, isDecision } = attributes;

  const { googleApiKey, countryAutocompleteService } = useContext(OptionsContext);
  const places = useScript(
    googleApiKey ? `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&callback=Function.prototype` : "",
  );
  const autocompleteService = useRef<AutocompleteService>();
  const [value, setValue] = useState<AutocompletePrediction | null>(null);
  const [options, setOptions] = useState<readonly AutocompletePrediction[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: AutocompletePrediction | string | null) => {
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
    setValue(newValue);
  };

  const fetch = useMemo(
    () =>
      throttle((request: { input: string }, callback: (results: AutocompletePrediction[] | null) => void) => {
        autocompleteService?.current?.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    if (!googleApiKey) {
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

    fetch(request, (results?: AutocompletePrediction[] | null) => {
      if (active) {
        let newOptions: readonly AutocompletePrediction[] = [];

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
  }, [places, value, searchText, fetch, country, countryAutocompleteService, googleApiKey]);

  // Initialize default value
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue as AutocompletePrediction);
    }
  }, [defaultValue]);

  return (
    <AutocompleteDS
      freeSolo
      autoComplete
      includeInputInList
      filterSelectedOptions
      defaultValue={defaultValue as AutocompletePrediction}
      ref={ref}
      getOptionLabel={(option) => (IsString(option) ? option : option.description)}
      filterOptions={(filterOptions) => filterOptions}
      options={options}
      value={value}
      onChange={handleChange}
      onBlur={() => {
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
      }}
      onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
      readOnly={readOnly}
      renderInput={({ disabled, InputLabelProps, inputProps, InputProps }) => (
        <TextField
          fullWidth
          required={required}
          name={name}
          helperText={helperText}
          disabled={disabled}
          label={label}
          inputRef={inputRef}
          inputProps={inputProps} // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={InputProps}
          InputLabelProps={{
            ...InputLabelProps,
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: Match) => [match.offset, match.offset + match.length]),
        );

        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box sx={{ color: "text.secondary", height: 10, mr: 2, width: 10 }} />
              </Grid>
              <Grid item xs>
                {parts.map((part, i) => {
                  const id = `${option.place_id}-${i}`;

                  return (
                    <Typography
                      variant="body1"
                      component="span"
                      key={id}
                      sx={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </Typography>
                  );
                })}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default forwardRef(Autocomplete);
