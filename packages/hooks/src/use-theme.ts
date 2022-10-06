import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

const DEFAULT_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

interface Options {
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * Use current theme.
 */
export function useTheme(options: Options = {}) {
  const { defaultTheme, storageKey = DEFAULT_STORAGE_KEY } = options;

  const isDarkPreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const osTheme = isDarkPreferred ? "dark" : "light";
  const { value: userTheme, set: setUserTheme } =
    useLocalStorage<Theme>(storageKey);

  const theme = userTheme ?? defaultTheme ?? osTheme;

  const toggle = () => setUserTheme(theme === "light" ? "dark" : "light");
  const setDark = () => setUserTheme("dark");
  const setLight = () => setUserTheme("light");

  return { theme, set: setUserTheme, toggle, setLight, setDark };
}
