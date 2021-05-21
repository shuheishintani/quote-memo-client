import { Box, Spinner, Text, useColorMode } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
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
  const { publicQuotes, loading } = usePublicQuotes(addedTags, currentPage);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        Public quotes
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
      {loading ? (
        <Spinner mb={24} />
      ) : (
        <Box
          borderRadius="md"
          cursor="pointer"
          maxWidth="400px"
          mx="auto"
          bg={isDark ? "#1B212C" : "white"}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          mb={24}
        >
          <Text fontSize="sm" align="center" py={2}>
            ＋ さらに読み込む
          </Text>
        </Box>
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
