import React from "react";
import { Quote } from "../type/Quote";
import { PublicQuoteItem } from "./PublicQuoteItem";

interface Props {
  publicQuotes: Quote[];
  setAddedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  favoriteQuotes: Quote[];
}

export const PublicQuotesListWithAuth: React.VFC<Props> = ({
  publicQuotes,
  setAddedTags,
  favoriteQuotes,
}) => {
  return (
    <>
      {publicQuotes.map((quote) => (
        <PublicQuoteItem
          key={quote.id}
          quote={quote}
          setAddedTags={setAddedTags}
          favoriteQuotes={favoriteQuotes}
        />
      ))}
    </>
  );
};
