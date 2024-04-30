import { createContext } from "react";

interface DefaultValueOptionsContext {
  countryAutocompleteService?: string;
  googleApiKey?: string;
  prefixResponseImageUriAutocomplete?: string;
}

export const defaultValueOptionsContext: DefaultValueOptionsContext = {
  countryAutocompleteService: "fr",
  googleApiKey: "",
  prefixResponseImageUriAutocomplete: "",
};

const OptionsContext = createContext(defaultValueOptionsContext);

export default OptionsContext;
