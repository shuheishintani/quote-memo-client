import React from "react";
import { Quote } from "../type/Quote";
import { PublicQuoteItem } from "./PublicQuoteItem";

interface Props {
  publicQuotes: Quote[];
  setAddedTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PublicQuotesList: React.VFC<Props> = ({
  publicQuotes,
  setAddedTags,
}) => {
  return (
    <>
      {publicQuotes.map((quote) => (
        <PublicQuoteItem
          key={quote.id}
          quote={quote}
          setAddedTags={setAddedTags}
        />
      ))}
    </>
  );
};
