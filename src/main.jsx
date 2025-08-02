import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyles } from "./styles/GlobalStyles.styled";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </StrictMode>
);
