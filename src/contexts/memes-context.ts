import { createContext, useContext } from "react";

export const MemesContext = createContext([]);

export const useMemes = () => {
  const context = useContext(MemesContext);

  if (context === undefined) {
    throw new Error("useMemes must be used within a MemesContext");
  }

  return context;
};
