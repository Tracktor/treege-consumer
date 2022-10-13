import { createContext } from "react";

interface DefaultValueOptionsContext {
  countryAutocompleteService?: string;
  googleApiKey?: string;
}

export const defaultValueOptionsContext: DefaultValueOptionsContext = {
  countryAutocompleteService: "fr",
  googleApiKey: "",
};

const OptionsContext = createContext(defaultValueOptionsContext);

export default OptionsContext;
