import type { ThemeOptions } from "@tracktor/design-system";
import { darkTheme, lightTheme } from "@/config/theme";

const getTheme = (theme?: "dark" | "light" | ThemeOptions) => {
  if (theme === "dark") {
    return darkTheme;
  }

  if (theme === "light" || !theme) {
    return lightTheme;
  }

  return theme;
};

export default getTheme;
