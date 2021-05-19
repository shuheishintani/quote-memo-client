import { Box, Spinner, Text } from "@chakra-ui/react";
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
  const { publicQuotes, loading: publicQuotesLoading } =
    usePublicQuotes(addedTags);

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        Published quotes
      </Text>
      <TagInput
        registeredTags={registeredTags}
        addedTags={addedTags}
        setAddedTags={setAddedTags}
      />
      <Box mt={24} />
      {publicQuotes && !publicQuotesLoading ? (
        publicQuotes.map((quote) => (
          <PublicQuoteItem
            key={quote.id}
            quote={quote}
            setAddedTags={setAddedTags}
          />
        ))
      ) : (
        <Spinner />
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
