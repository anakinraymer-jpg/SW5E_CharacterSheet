import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, type Theme } from "../theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      title="Toggle light/dark theme"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
