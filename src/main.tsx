import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppContextProvider } from "./contexts/app_context/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
