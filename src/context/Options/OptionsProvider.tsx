import { ThemeProvider } from "@tracktor/design-system";
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

  return (
    <ThemeProvider>
      <OptionsContext.Provider value={mergedOptions}>{children}</OptionsContext.Provider>
    </ThemeProvider>
  );
};

export default OptionsProvider;
