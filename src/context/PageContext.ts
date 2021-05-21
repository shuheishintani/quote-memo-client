import { createContext } from "react";

export const PageContext = createContext<{
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}>(
  {} as {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }
);
