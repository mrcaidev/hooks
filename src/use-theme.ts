import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

// Constants.
const MEDIA_QUERY = "(prefers-color-scheme: dark)";
const DEFAULT_STORAGE_KEY = "theme";

/**
 * Theme type.
 *
 * @public
 */
export type Theme = "light" | "dark";

/**
 * Options to custom theme.
 *
 * @public
 */
export interface UseThemeOptions {
  /** Theme to override user's OS preferrence. */
  defaultTheme?: Theme;

  /** Key of theme value in local storage. */
  storageKey?: string;
}

/**
 * Current theme, and functions to update it.
 *
 * @public
 */
export interface UseThemeResult {
  /** Current theme. */
  theme: Theme;

  /** Toggle the theme. */
  toggle: () => void;

  /** Set the theme to light. */
  setLight: () => void;

  /** Set the theme to dark. */
  setDark: () => void;
}

/**
 * Use current theme.
 *
 * @param options - Options to customize theme.
 * @returns Current theme, and functions to update it.
 *
 * @public
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeResult {
  const { defaultTheme, storageKey = DEFAULT_STORAGE_KEY } = options;

  // OS theme.
  const isDarkPreferred = useMediaQuery(MEDIA_QUERY);
  const osTheme = isDarkPreferred ? "dark" : "light";

  // User selected theme.
  const { value: userTheme, set: setUserTheme } =
    useLocalStorage<Theme>(storageKey);

  // User > Override > OS.
  const theme = userTheme ?? defaultTheme ?? osTheme;

  // Toggle.
  const toggle = () => {
    setUserTheme(theme === "light" ? "dark" : "light");
  };

  // Set to dark.
  const setDark = () => {
    setUserTheme("dark");
  };

  // Set to light.
  const setLight = () => {
    setUserTheme("light");
  };

  return {
    theme,
    toggle,
    setLight,
    setDark,
  };
}
