import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

type Theme = "light" | "dark";

type Options = {
  defaultTheme?: Theme;
  storageKey?: string;
};

/**
 * Use current theme.
 */
export function useTheme(options: Options = {}) {
  const { defaultTheme, storageKey = "theme" } = options;

  const isDarkOs = useMediaQuery("(prefers-color-scheme: dark)");
  const osTheme = isDarkOs ? "dark" : "light";

  const { value: storedTheme, set: setStoredTheme } = useLocalStorage<Theme>(
    storageKey,
    {
      serializer: (value) => value,
      deserializer: (value) => value as Theme,
    }
  );

  const theme = storedTheme ?? defaultTheme ?? osTheme;
  const toggle = () => setStoredTheme(theme === "light" ? "dark" : "light");
  const setLight = () => setStoredTheme("light");
  const setDark = () => setStoredTheme("dark");

  return { theme, set: setStoredTheme, toggle, setLight, setDark };
}
