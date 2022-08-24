import { createContext } from "react";

export const defaultValueTreegeContext = {
  countryAutocompleteService: "fr",
  googleApiKey: "",
};

const TreegeContext = createContext(defaultValueTreegeContext);

export default TreegeContext;
