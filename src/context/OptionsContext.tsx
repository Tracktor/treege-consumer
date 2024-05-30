import { LicenseInfo } from "@mui/x-license";
import { createContext, ReactNode, useContext, useLayoutEffect, useMemo } from "react";
import { TreegeConsumerContext } from "@/context/TreegeConsumerProvider";

export interface OptionsProviderContext {
  countryAutocompleteService?: string;
  googleApiKey?: string;
  prefixResponseImageUriAutocomplete?: string;
  licenseMuiX?: string;
}

export const OptionsContext = createContext<OptionsProviderContext>({
  countryAutocompleteService: "",
  googleApiKey: "",
  licenseMuiX: "",
  prefixResponseImageUriAutocomplete: "",
});

export interface OptionsProviderProps {
  children: ReactNode;
  options?: OptionsProviderContext;
}

const OptionsProvider = ({ children, options }: OptionsProviderProps) => {
  const treegeConsumerContext = useContext(TreegeConsumerContext);

  const value = useMemo(
    () => ({
      countryAutocompleteService: options?.countryAutocompleteService || treegeConsumerContext.countryAutocompleteService || "fr",
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
    if (value.licenseMuiX) {
      LicenseInfo.setLicenseKey(value.licenseMuiX);
    }
  }, [value.licenseMuiX]);

  return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>;
};

export default OptionsProvider;
