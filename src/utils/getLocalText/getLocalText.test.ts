import { deDE, frFR, enUS, esES, ptBR, itIT, PickersInputLocaleText } from "@mui/x-date-pickers-pro/locales";
import { getLocalText } from "./getLocalText";

describe("getLocalText", () => {
  it("retourne le localeText correct pour chaque locale supportée", () => {
    expect(getLocalText("fr")).toBe(frFR.components.MuiLocalizationProvider.defaultProps.localeText);
    expect(getLocalText("fr-FR")).toBe(frFR.components.MuiLocalizationProvider.defaultProps.localeText);
    expect(getLocalText("de")).toBe(deDE.components.MuiLocalizationProvider.defaultProps.localeText);
    expect(getLocalText("en")).toBe(enUS.components.MuiLocalizationProvider.defaultProps.localeText);
    expect(getLocalText("es")).toBe(esES.components.MuiLocalizationProvider.defaultProps.localeText);
    expect(getLocalText("pt")).toBe(ptBR.components.MuiLocalizationProvider.defaultProps.localeText);
    expect(getLocalText("it")).toBe(itIT.components.MuiLocalizationProvider.defaultProps.localeText);
  });

  it("retourne undefined pour une locale inconnue", () => {
    expect(getLocalText("ru")).toBeUndefined();
    expect(getLocalText("zh-CN")).toBeUndefined();
  });

  it("retourne le localText passé en paramètre même si la locale est connue", () => {
    const custom: PickersInputLocaleText = { cancelButtonLabel: "Annuler" } as PickersInputLocaleText;
    expect(getLocalText("fr", custom)).toBe(custom);
  });

  it("retourne undefined si aucun paramètre n'est passé", () => {
    expect(getLocalText()).toBeUndefined();
  });
});
