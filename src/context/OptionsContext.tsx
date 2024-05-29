import { LicenseInfo } from "@mui/x-license";
import { createContext, ReactNode, useContext, useLayoutEffect, useMemo } from "react";
import { TreegeConsumerContext } from "@/context/TreegeConsumerProvider";

export interface TreegeProviderOptionsContext {
  countryAutocompleteService?: string;
  googleApiKey?: string;
  prefixResponseImageUriAutocomplete?: string;
  licenseMuiX?: string;
}

export const defaultValueOptionsContext: TreegeProviderOptionsContext = {
  countryAutocompleteService: "fr",
  googleApiKey: "",
  licenseMuiX: "",
  prefixResponseImageUriAutocomplete: "",
};

export const OptionsContext = createContext(defaultValueOptionsContext);

export interface OptionsProviderProps {
  children: ReactNode;
  options?: TreegeProviderOptionsContext;
}

const OptionsProvider = ({ children, options }: OptionsProviderProps) => {
  const treegeConsumerContext = useContext(TreegeConsumerContext);

  const mergedOptions = useMemo(
    () => ({
      ...defaultValueOptionsContext,
      ...options,
      countryAutocompleteService: options?.countryAutocompleteService || treegeConsumerContext.countryAutocompleteService,
      googleApiKey: options?.googleApiKey || treegeConsumerContext.googleApiKey,
      licenseMuiX: options?.licenseMuiX || treegeConsumerContext.licenseMuiX,
      prefixResponseImageUriAutocomplete:
        options?.prefixResponseImageUriAutocomplete || treegeConsumerContext.prefixResponseImageUriAutocomplete,
    }),
    [
      options,
      treegeConsumerContext.countryAutocompleteService,
      treegeConsumerContext.googleApiKey,
      treegeConsumerContext.licenseMuiX,
      treegeConsumerContext.prefixResponseImageUriAutocomplete,
    ],
  );

  // Set license key for mui x if provided
  useLayoutEffect(() => {
    if (mergedOptions.licenseMuiX) {
      LicenseInfo.setLicenseKey(mergedOptions.licenseMuiX);
    }
  }, [mergedOptions.licenseMuiX]);

  return <OptionsContext.Provider value={mergedOptions}>{children}</OptionsContext.Provider>;
};

export default OptionsProvider;
