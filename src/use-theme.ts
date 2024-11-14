import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

export type Theme = "light" | "dark";

export type UseThemeOptions = {
  defaultTheme?: Theme;
  storageKey?: string;
};

/**
 * Use light/dark/system theme.
 */
export function useTheme(options: UseThemeOptions = {}) {
  const { defaultTheme, storageKey = "theme" } = options;

  const isDarkDevice = useMediaQuery("(prefers-color-scheme: dark)");
  const deviceTheme = isDarkDevice ? "dark" : "light";

  const {
    value: storedTheme,
    set: setStoredTheme,
    remove: removeStoredTheme,
  } = useLocalStorage<Theme>(storageKey, {
    serializer: (value) => value,
    deserializer: (value) => value as Theme,
  });

  const theme = storedTheme ?? defaultTheme ?? deviceTheme;

  const setLight = () => setStoredTheme("light");
  const setDark = () => setStoredTheme("dark");
  const toggle = () => setStoredTheme(theme === "dark" ? "light" : "dark");
  const reset = () => removeStoredTheme();

  return { theme, set: setStoredTheme, setLight, setDark, toggle, reset };
}
