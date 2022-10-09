import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface Options {
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * Use current theme.
 */
export function useTheme(options: Options = {}) {
  const { defaultTheme, storageKey = "theme" } = options;

  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const userTheme = getUserTheme(storageKey);
    if (userTheme) {
      setTheme(userTheme);
      return;
    }
    if (defaultTheme) {
      setTheme(defaultTheme);
      return;
    }
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      return;
    }
    setTheme("light");
  }, [defaultTheme, storageKey]);

  const set: typeof setTheme = (action) => {
    const nextTheme = action instanceof Function ? action(theme) : action;
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  const toggle = () => set((theme) => (theme === "light" ? "dark" : "light"));
  const setLight = () => set("light");
  const setDark = () => set("dark");

  return { theme, set, toggle, setLight, setDark };
}

function getUserTheme(storageKey: string) {
  try {
    const userTheme = localStorage.getItem(storageKey);
    return userTheme === "light" || userTheme === "dark" ? userTheme : null;
  } catch {
    return null;
  }
}
