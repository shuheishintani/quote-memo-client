import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import QuoteForm from "../../components/QuoteForm";
import { QuotesContext } from "../../context/QuotesContext";
import { useUpdateQuote } from "../../hooks/useUpdateQuote";
import { Text } from "@chakra-ui/react";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { quotes } = useContext(QuotesContext);
  const i = quotes.findIndex((quote) => quote.id === parseInt(id as string));
  const edittingQuote = quotes[i];
  const { updateQuote, processing } = useUpdateQuote();

  return (
    <>
      <Text fontSize="xl" mb={10} fontWeight="bold">
        Edit
      </Text>
      <QuoteForm
        updateQuote={updateQuote}
        processing={processing}
        initialQuote={edittingQuote}
        registeredTags={[]}
      />
    </>
  );
};

export default Edit;
