import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import QuoteForm from "../../components/QuoteForm";
import { QuotesContext } from "../../context/QuotesContext";
import { useUpdateQuote } from "../../hooks/useUpdateQuote";
import { Icon, Text } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { quotes } = useContext(QuotesContext);
  const i = quotes.findIndex((quote) => quote.id === parseInt(id as string));
  const edittingQuote = quotes[i];
  const { updateQuote, processing } = useUpdateQuote();

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mr={2} mb={10}>
        <Icon as={FiEdit} mr={2} w={6} h={6} />
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
