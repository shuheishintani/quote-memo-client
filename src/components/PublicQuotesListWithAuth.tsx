import React from "react";
import { useFavoriteQuotes } from "../hooks/useFavoriteQuotes";
import { Quote } from "../type/Quote";
import { PublicQuoteItem } from "./PublicQuoteItem";

interface Props {
  publicQuotes: Quote[];
  setAddedTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PublicQuotesListWithAuth: React.VFC<Props> = ({
  publicQuotes,
  setAddedTags,
}) => {
  const { favoriteQuotes } = useFavoriteQuotes();
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
