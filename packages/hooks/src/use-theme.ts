import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

// Constants.
const MEDIA_QUERY = "(prefers-color-scheme: dark)";
const DEFAULT_STORAGE_KEY = "theme";

/** Theme type. */
export type Theme = "light" | "dark";

/** Options to customize theme. */
export interface UseThemeOptions {
  /** Default theme to override user's OS preferrence. */
  defaultTheme?: Theme;

  /** Key to store theme value in local storage. */
  storageKey?: string;
}

/**
 * Use current theme.
 * @param options - Options to customize theme, defaults to `{}`.
 * @returns Current theme, and some functions to update it.
 */
export function useTheme(options: UseThemeOptions = {}) {
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

  return { theme, set: setUserTheme, toggle, setLight, setDark };
}
