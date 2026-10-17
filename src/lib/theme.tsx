import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_STORAGE_KEY = "ecanteen-theme";

export function resolveThemePreference(value: string | null): ThemeMode {
  return value === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let preference: ThemeMode = "light";
    try {
      preference = resolveThemePreference(window.localStorage.getItem(THEME_STORAGE_KEY));
    } catch {
      // Keep the app usable with the default light theme when storage is unavailable.
    }
    setThemeState(preference);
    document.documentElement.classList.toggle("dark", preference === "dark");
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset["theme"] = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Keep theme switching available when storage is unavailable.
    }
  }, [theme, loaded]);

  function setTheme(nextTheme: ThemeMode) {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.dataset["theme"] = nextTheme;
    setThemeState(nextTheme);
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}