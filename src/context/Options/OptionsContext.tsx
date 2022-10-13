import { createContext } from "react";

export const defaultValueTreegeContext = {
  countryAutocompleteService: "fr",
  googleApiKey: "",
};

const OptionsContext = createContext(defaultValueTreegeContext);

export default OptionsContext;
