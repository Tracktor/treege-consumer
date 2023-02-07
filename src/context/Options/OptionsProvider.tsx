import { ReactNode, useMemo } from "react";
import OptionsContext, { defaultValueOptionsContext } from "@/context/Options/OptionsContext";

export interface TreegeProviderProps {
  children: ReactNode;
  options?: {
    countryAutocompleteService?: string;
    googleApiKey?: string;
  };
}

const OptionsProvider = ({ children, options }: TreegeProviderProps) => {
  const mergedOptions = useMemo(() => ({ ...defaultValueOptionsContext, ...options }), [options]);

  return <OptionsContext.Provider value={mergedOptions}>{children}</OptionsContext.Provider>;
};

export default OptionsProvider;
