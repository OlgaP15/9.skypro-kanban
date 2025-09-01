import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const ThemeContext = createContext();

const lightTheme = {
  background: "#f1f1f1",
  text: "#000000",
  cardBg: "#ffffff",
  modalBg: "#ffffff",
  headerBg: "#d9dce0",
  border: "rgba(148, 166, 190, 0.4)",
  accent: "#565eef",
  accentHover: "#33399b",
  inputBg: "#ffffff",
  placeholder: "#94a6be",
  mutedText: "#94a6be66",
  hoverBg: "#dce0ff",   
  hoverBg2: "#bfc4ff",    
};

const darkTheme = {
  background: "#1e1e1e",
  text: "#ffffff",
  cardBg: "#2a2a2a",
  modalBg: "#2a2a2a",
  headerBg: "#333333",
  border: "#444444",
  accent: "#8b95ff",
  accentHover: "#5a63e0",
  inputBg: "#1e1e1e",
  placeholder: "#aaaaaa",
  mutedText: "#888888",
  hoverBg: "#444466",    
  hoverBg2: "#555577",  
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeObject = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themeObject}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
