import { useTheme, useUpdate } from "@mrcaidev/hooks";
import { forwardRef } from "react";
import { Moon, Sun } from "react-feather";

const ThemeToggler = forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, toggle } = useTheme();

  useUpdate(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

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
