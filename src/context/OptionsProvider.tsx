import { LicenseInfo } from "@mui/x-license";
import { createContext, ReactNode, useContext, useLayoutEffect, useMemo } from "react";
import { TreegeConsumerContext } from "@/context/TreegeConsumerProvider";
import { TreegeConsumerProps } from "@/features/TreegeConsumer";

export type OptionsProviderContext = TreegeConsumerProps["options"];

export const OptionsContext = createContext<OptionsProviderContext>({});

export interface OptionsProviderProps {
  children: ReactNode;
  options?: OptionsProviderContext;
}

const OptionsProvider = ({ children, options }: OptionsProviderProps) => {
  const treegeConsumerContext = useContext(TreegeConsumerContext);

  const value = useMemo(
    () => ({
      adapterLocale: options?.adapterLocale || treegeConsumerContext.adapterLocale,
      countryAutocompleteService: options?.countryAutocompleteService || treegeConsumerContext.countryAutocompleteService || "fr",
      disablePastDatePicker: options?.disablePastDatePicker,
      disablePastDateRangePicker: options?.disablePastDateRangePicker,
      googleApiKey: options?.googleApiKey || treegeConsumerContext.googleApiKey,
      licenseMuiX: options?.licenseMuiX || treegeConsumerContext.licenseMuiX,
      prefixResponseImageUriAutocomplete:
        options?.prefixResponseImageUriAutocomplete || treegeConsumerContext.prefixResponseImageUriAutocomplete,
    }),
    [
      options?.adapterLocale,
      options?.countryAutocompleteService,
      options?.disablePastDatePicker,
      options?.disablePastDateRangePicker,
      options?.googleApiKey,
      options?.licenseMuiX,
      options?.prefixResponseImageUriAutocomplete,
      treegeConsumerContext.adapterLocale,
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
