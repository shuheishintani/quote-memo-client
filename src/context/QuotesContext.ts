import { createContext } from "react";
import { Quote } from "../type/Quote";

export const QuotesContext = createContext<{
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
}>(
  {} as {
    quotes: Quote[];
    setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  }
);
