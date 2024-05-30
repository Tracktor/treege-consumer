import { LicenseInfo } from "@mui/x-license";
import { ReactNode, useLayoutEffect, useMemo, createContext } from "react";

interface TreegeConsumerProviderContext {
  countryAutocompleteService?: string;
  googleApiKey?: string;
  licenseMuiX?: string;
  prefixResponseImageUriAutocomplete?: string;
}

export interface TreegeConsumerProviderProps extends TreegeConsumerProviderContext {
  children: ReactNode;
}

export const TreegeConsumerContext = createContext<TreegeConsumerProviderContext>({
  countryAutocompleteService: "",
  googleApiKey: "",
  licenseMuiX: "",
  prefixResponseImageUriAutocomplete: "",
});

export const TreegeConsumerProvider = ({
  children,
  licenseMuiX,
  countryAutocompleteService,
  prefixResponseImageUriAutocomplete,
  googleApiKey,
}: TreegeConsumerProviderProps) => {
  // Set license key for mui x if provided
  useLayoutEffect(() => {
    if (licenseMuiX) {
      LicenseInfo.setLicenseKey(licenseMuiX);
    }
  }, [licenseMuiX]);

  const value = useMemo(
    () => ({
      countryAutocompleteService: countryAutocompleteService || "fr",
      googleApiKey,
      licenseMuiX,
      prefixResponseImageUriAutocomplete,
    }),
    [countryAutocompleteService, googleApiKey, licenseMuiX, prefixResponseImageUriAutocomplete],
  );

  return <TreegeConsumerContext.Provider value={value}>{children}</TreegeConsumerContext.Provider>;
};

export default TreegeConsumerProvider;
