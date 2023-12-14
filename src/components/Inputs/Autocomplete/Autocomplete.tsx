import { Autocomplete as AutocompleteDS, Box, Grid, TextField, Typography } from "@tracktor/design-system";
import parse from "autosuggest-highlight/parse";
import { throttle } from "lodash-es";
import { forwardRef, Ref, SyntheticEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import OptionsContext from "@/context/Options/OptionsContext";
import useScript from "@/hooks/useScript";
import { IsString } from "@/types/TypeGuards";

export interface AutocompleteProps {
  label: string;
  name: string;
  helperText?: string;
  inputRef: Ref<any>;
  required?: boolean;
  country?: string;
  defaultValue?: unknown;
  readOnly?: boolean;
}

type AutocompleteService = google.maps.places.AutocompleteService;
type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const Autocomplete = (
  { defaultValue, label, name, helperText, inputRef, required, country, readOnly }: AutocompleteProps,
  ref: Ref<unknown> | undefined,
) => {
  const { googleApiKey, countryAutocompleteService } = useContext(OptionsContext);
  const places = useScript(
    googleApiKey ? `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&callback=Function.prototype` : "",
  );
  const autocompleteService = useRef<AutocompleteService>();
  const [value, setValue] = useState<AutocompletePrediction | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly AutocompletePrediction[]>([]);

  const handleChange = useCallback(
    (_: SyntheticEvent<Element, Event>, newValue: AutocompletePrediction | string | null) => {
      if (IsString(newValue)) return;

      setOptions(newValue ? [newValue, ...options] : options);
      setValue(newValue);
    },
    [options],
  );

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

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    const request = {
      componentRestrictions: {
        country: country ?? countryAutocompleteService,
      },
      input: inputValue,
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
  }, [places, value, inputValue, fetch, country, countryAutocompleteService, googleApiKey]);

  // Initialize default value
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue as AutocompletePrediction);
    }
  }, [defaultValue]);

  return (
    <AutocompleteDS
      autoComplete
      includeInputInList
      filterSelectedOptions
      freeSolo
      defaultValue={defaultValue as AutocompletePrediction}
      ref={ref}
      getOptionLabel={(option) => (IsString(option) ? option : option.description)}
      filterOptions={(filterOptions) => filterOptions}
      options={options}
      value={value}
      onChange={handleChange}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
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
            shrink: true,
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
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
