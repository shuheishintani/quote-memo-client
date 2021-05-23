import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { FetchMoreButton } from "../components/FetchMoreButton";
import { PublicQuotesList } from "../components/PublicQuotesList";
import { PublicQuotesListWithAuth } from "../components/PublicQuotesListWithAuth";
import { TagInput } from "../components/TagInput";
import { useAuth } from "../hooks/useAuth";
import { usePublicQuotes } from "../hooks/usePublicQuotes";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Index: NextPage<Props> = ({ registeredTags }) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { publicQuotes, fetching, nextFetching, next } = usePublicQuotes(
    addedTags,
    currentPage
  );
  const { user } = useAuth();

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        <Icon as={AiOutlineTag} mr={2} w={5} h={5} />
        Tags
      </Text>

      <TagInput
        registeredTags={registeredTags}
        addedTags={addedTags}
        setAddedTags={setAddedTags}
        setCurrentPage={setCurrentPage}
      />
      <Box mt={24} />
      {publicQuotes && user ? (
        <PublicQuotesListWithAuth
          publicQuotes={publicQuotes}
          setAddedTags={setAddedTags}
        />
      ) : (
        <PublicQuotesList
          publicQuotes={publicQuotes}
          setAddedTags={setAddedTags}
        />
      )}
      {fetching ? (
        <Spinner mb={24} />
      ) : (
        <FetchMoreButton
          setCurrentPage={setCurrentPage}
          nextFetching={nextFetching}
          next={next}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/public/tags"
  );
  const data = await response.json();
  const registeredTags = data.map((tag: Tag) => tag.name);
  return {
    props: {
      registeredTags: registeredTags,
    },
  };
};

export default Index;
