import { createContext, useContext } from "react";

type Theme = {
  type: "light" | "dark";
};

export type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: { type: "light" },
  toggleTheme: () => {},
});

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};
