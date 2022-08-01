import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

// Constants.
const MEDIA_QUERY = "(prefers-color-scheme: dark)";
const DEFAULT_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export interface UseThemeOptions {
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface UseThemeResult {
  theme: Theme;
  toggle: () => void;
  setLight: () => void;
  setDark: () => void;
}

/**
 * Use current theme.
 * @param options - Options to customize theme.
 * @returns Current theme, and functions to update it.
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeResult {
  const { defaultTheme, storageKey = DEFAULT_STORAGE_KEY } = options;

  const isDarkPreferred = useMediaQuery(MEDIA_QUERY);
  const osTheme = isDarkPreferred ? "dark" : "light";
  const { value: userTheme, set: setUserTheme } =
    useLocalStorage<Theme>(storageKey);

  // User > Override > OS.
  const theme = userTheme ?? defaultTheme ?? osTheme;

  const toggle = () => setUserTheme(theme === "light" ? "dark" : "light");
  const setDark = () => setUserTheme("dark");
  const setLight = () => setUserTheme("light");

  return { theme, toggle, setLight, setDark };
}
