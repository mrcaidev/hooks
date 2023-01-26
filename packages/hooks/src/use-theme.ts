import { useLocalStorage } from "./use-local-storage";
import { useMediaQuery } from "./use-media-query";

export type Theme = "light" | "dark";

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

  const { value: theme, set } = useLocalStorage<Theme>(storageKey, {
    defaultValue: defaultTheme ?? osTheme,
    serializer: (value) => value,
    deserializer: (value) => value as Theme,
  });

  const toggle = () => set((theme) => (theme === "dark" ? "light" : "dark"));
  const setLight = () => set("light");
  const setDark = () => set("dark");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { theme: theme!, set, toggle, setLight, setDark };
}
