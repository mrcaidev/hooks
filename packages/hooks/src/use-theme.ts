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
    const userTheme = getStoredTheme(storageKey);
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
    setStoredTheme(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  const toggle = () => set((theme) => (theme === "light" ? "dark" : "light"));
  const setLight = () => set("light");
  const setDark = () => set("dark");

  return { theme, set, toggle, setLight, setDark };
}

function getStoredTheme(key: string) {
  try {
    const userTheme = localStorage.getItem(key);
    return userTheme === "light" || userTheme === "dark" ? userTheme : null;
  } catch {
    return null;
  }
}

function setStoredTheme(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}
