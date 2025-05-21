"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted to prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="relative flex items-center w-16 h-8 rounded-full cursor-pointer bg-accent"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
    >
      {/* Sun Icon */}
      <FaSun
        className={`absolute left-2 text-sm transition-opacity ${
          isDark ? "opacity-50" : "opacity-100"
        }`}
        style={{
          color: "var(--background)",
        }}
      />

      {/* Moon Icon */}
      <FaMoon
        className={`absolute right-2 text-sm transition-opacity ${
          isDark ? "opacity-100" : "opacity-50"
        }`}
        style={{
          color: "var(--background)",
        }}
      />

      {/* Movable Circle */}
      <div
        className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-transform`}
        style={{
          backgroundColor: "var(--background)",
          transform: isDark ? "translateX(1.5rem)" : "translateX(0)",
        }}
      >
        {isDark ? (
          <FaMoon className="text-sm" style={{ color: "var(--accent)" }} />
        ) : (
          <FaSun className="text-sm" style={{ color: "var(--accent)" }} />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
