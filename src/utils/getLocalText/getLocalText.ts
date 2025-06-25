// eslint-disable-next-line import/no-extraneous-dependencies
import { deDE, frFR, enUS, esES, ptBR, itIT } from "@mui/x-date-pickers/locales";
import { PickersInputLocaleText } from "@mui/x-date-pickers-pro";

const localeTexts: Record<string, PickersInputLocaleText> = {
  de: deDE.components.MuiLocalizationProvider.defaultProps.localeText,
  "de-DE": deDE.components.MuiLocalizationProvider.defaultProps.localeText,
  en: enUS.components.MuiLocalizationProvider.defaultProps.localeText,
  "en-US": enUS.components.MuiLocalizationProvider.defaultProps.localeText,
  es: esES.components.MuiLocalizationProvider.defaultProps.localeText,
  "es-ES": esES.components.MuiLocalizationProvider.defaultProps.localeText,
  fr: frFR.components.MuiLocalizationProvider.defaultProps.localeText,
  "fr-FR": frFR.components.MuiLocalizationProvider.defaultProps.localeText,
  it: itIT.components.MuiLocalizationProvider.defaultProps.localeText,
  "it-IT": itIT.components.MuiLocalizationProvider.defaultProps.localeText,
  pt: ptBR.components.MuiLocalizationProvider.defaultProps.localeText,
  "pt-BR": ptBR.components.MuiLocalizationProvider.defaultProps.localeText,
};

/**
 * Get the local text for the date pickers based on the adapter locale or provided localText.
 * @param adapterLocale
 * @param localText
 */
export const getLocalText = (adapterLocale?: string, localText?: PickersInputLocaleText): PickersInputLocaleText | undefined => {
  if (localText) {
    return localText;
  }
  if (adapterLocale && localeTexts[adapterLocale]) {
    return localeTexts[adapterLocale];
  }
  return undefined;
};

export default getLocalText;
