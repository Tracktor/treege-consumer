import type { ThemeOptions } from "@tracktor/design-system";
import COLORS from "@/constants/colors";

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      dark: COLORS.tertiary,
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    background: {
      default: COLORS.background,
      paper: COLORS.background,
    },
    mode: "dark",
    primary: {
      dark: COLORS.tertiary,
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
};
