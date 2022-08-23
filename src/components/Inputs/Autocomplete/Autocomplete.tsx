import { Autocomplete as AutocompleteDS, CircularProgress, TextField } from "design-system";
import { forwardRef, Ref, useEffect, useState } from "react";

export interface AutocompleteProps {
  label: string;
  name: string;
  inputRef: Ref<any>;
}

interface Film {
  title: string;
  year: number;
}

const topFilms = [
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
];

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Autocomplete = ({ label, name, inputRef }: AutocompleteProps, ref: Ref<unknown> | undefined) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Film[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <AutocompleteDS
      ref={ref}
      id={name}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={({ disabled, fullWidth, id, InputLabelProps, inputProps, InputProps, size }) => (
        <TextField
          disabled={disabled}
          fullWidth={fullWidth}
          label={label}
          id={id}
          size={size}
          inputRef={inputRef}
          inputProps={inputProps}
          InputProps={{
            ...InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {InputProps.endAdornment}
              </>
            ),
            type: "search",
          }}
          InputLabelProps={{
            ...InputLabelProps,
            shrink: true,
          }}
        />
      )}
    />
  );
};

export default forwardRef(Autocomplete);
