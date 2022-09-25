import { forwardRef, useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";

const ThemeToggler = forwardRef<HTMLButtonElement>((_, ref) => {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    if (typeof localStorage !== undefined && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  const toggle = () =>
    setTheme((theme) => {
      const nextTheme = theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      return nextTheme;
    });
  const ThemeIcon = theme === "light" ? Moon : Sun;

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 hover:text-highlight"
    >
      <ThemeIcon size="24" />
    </button>
  );
});

ThemeToggler.displayName = "ThemeToggler";

export default ThemeToggler;
