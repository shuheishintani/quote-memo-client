import { Box, Spinner, Text, useColorMode } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { FetchMoreButton } from "../components/FetchMoreButton";
import { PublicQuoteItem } from "../components/PublicQuoteItem";
import { TagInput } from "../components/TagInput";
import { usePublicQuotes } from "../hooks/usePublicQuotes";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Index: NextPage<Props> = ({ registeredTags }) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { publicQuotes, fetching, nextFetching } = usePublicQuotes(
    addedTags,
    currentPage
  );
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        Public Quotes
      </Text>
      <TagInput
        registeredTags={registeredTags}
        addedTags={addedTags}
        setAddedTags={setAddedTags}
        setCurrentPage={setCurrentPage}
      />
      <Box mt={24} />
      {publicQuotes &&
        publicQuotes.map((quote) => (
          <PublicQuoteItem
            key={quote.id}
            quote={quote}
            setAddedTags={setAddedTags}
          />
        ))}
      {fetching ? (
        <Spinner mb={24} />
      ) : (
        <FetchMoreButton
          setCurrentPage={setCurrentPage}
          nextFetching={nextFetching}
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
