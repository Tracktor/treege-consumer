import { ReactNode, useMemo } from "react";
import TreegeContext, { defaultValueTreegeContext } from "@/context/TreegeContext";

export interface TreegeProviderProps {
  children: ReactNode;
  options?: {
    countryAutocompleteService?: string;
    googleApiKey?: string;
  };
}

const TreegeProvider = ({ children, options }: TreegeProviderProps) => {
  const mergedOptions = useMemo(() => ({ ...defaultValueTreegeContext, ...options }), [options]);

  return <TreegeContext.Provider value={mergedOptions}>{children}</TreegeContext.Provider>;
};

export default TreegeProvider;
