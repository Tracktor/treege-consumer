import { LicenseInfo } from "@mui/x-license";
import { ReactNode, useLayoutEffect, useMemo, createContext } from "react";

interface DataGridContextDefaultValues {
  countryAutocompleteService: "fr";
  googleApiKey: "";
  licenseMuiX: "";
  prefixResponseImageUriAutocomplete: "";
}

export const TreegeConsumerContext = createContext<DataGridContextDefaultValues>({
  countryAutocompleteService: "fr",
  googleApiKey: "",
  licenseMuiX: "",
  prefixResponseImageUriAutocomplete: "",
});

export interface TreegeConsumerProviderProps {
  children: ReactNode;
  countryAutocompleteService: "fr";
  googleApiKey: "";
  licenseMuiX: "";
  prefixResponseImageUriAutocomplete: "";
}

export const TreegeConsumerProvider = ({
  children,
  licenseMuiX,
  countryAutocompleteService,
  prefixResponseImageUriAutocomplete,
  googleApiKey,
}: TreegeConsumerProviderProps) => {
  useLayoutEffect(() => {
    if (licenseMuiX) {
      LicenseInfo.setLicenseKey(licenseMuiX);
    }
  }, [licenseMuiX]);

  const value = useMemo(
    () => ({
      countryAutocompleteService,
      googleApiKey,
      licenseMuiX,
      prefixResponseImageUriAutocomplete,
    }),
    [countryAutocompleteService, googleApiKey, licenseMuiX, prefixResponseImageUriAutocomplete],
  );

  return <TreegeConsumerContext.Provider value={value}>{children}</TreegeConsumerContext.Provider>;
};

export default TreegeConsumerProvider;
