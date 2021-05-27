import { Icon, Spinner, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit } from "react-icons/fi";
import QuoteForm from "../../components/QuoteForm";
import { useGetPrivateQuoteById } from "../../hooks/useGetPrivateQuoteById";
import { useUpdateQuote } from "../../hooks/useUpdateQuote";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { quote, fetching } = useGetPrivateQuoteById(id);

  const { updateQuote, processing } = useUpdateQuote();

  console.log(quote);

  if (fetching) {
    return <Spinner />;
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mr={2} mb={10}>
        <Icon as={FiEdit} mr={2} w={6} h={6} />
        Edit
      </Text>
      {quote && (
        <QuoteForm
          updateQuote={updateQuote}
          processing={processing}
          initialQuote={quote}
          registeredTags={[]}
        />
      )}
    </>
  );
};

export default Edit;
