import { useEffect, useMemo, useState } from "react";
import type { AppTheme } from "./themeStore";
import { applyThemeToDocument, getStoredTheme, setStoredTheme } from "./themeStore";

const THEMES: Array<{ value: AppTheme; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "sepia", label: "Sepia" },
  { value: "midnight", label: "Midnight" },
  { value: "forest", label: "Forest" },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<AppTheme>("light");
  const options = useMemo(() => THEMES, []);

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyThemeToDocument(stored);
  }, []);

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden sm:inline text-foreground/70">Theme</span>
      <select
        value={theme}
        onChange={(e) => {
          const next = e.target.value as AppTheme;
          setTheme(next);
          setStoredTheme(next);
          applyThemeToDocument(next);
        }}
        className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

