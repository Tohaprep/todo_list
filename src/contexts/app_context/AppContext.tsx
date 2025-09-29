import React from "react";
import type { AppContextType } from "./AppContextProvider";

export const AppContext = React.createContext<AppContextType | null>(null);
