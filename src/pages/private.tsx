import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { QuoteItem } from "../components/QuoteItem";
import { TagInput } from "../components/TagInput";
import { useAuth } from "../hooks/useAuth";
import { usePublicQuotes } from "../hooks/usePublicQuotes";
import { useQuotes } from "../hooks/useQuotes";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Index: NextPage<Props> = ({ registeredTags }) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { quotes, loading: quotesLoading } = useQuotes(addedTags, currentPage);
  const { user, loading: userLoading } = useAuth();

  if (userLoading) {
    <Spinner />;
  }

  return (
    <>
      <Flex>
        <Avatar
          size="sm"
          name={user?.displayName || undefined}
          src={user?.providerData[0]?.photoURL || undefined}
          mr={2}
        />
        <Text fontSize="xl" mb={10} fontWeight="bold">
          {user?.displayName}'s quotes
        </Text>
      </Flex>

      {user && (
        <>
          <TagInput
            registeredTags={registeredTags}
            addedTags={addedTags}
            setAddedTags={setAddedTags}
          />
          <Box mt={24} />
          {quotes &&
            quotes.map((quote) => (
              <QuoteItem
                key={quote.id}
                quote={quote}
                setAddedTags={setAddedTags}
              />
            ))}
          {quotesLoading ? (
            <Spinner />
          ) : (
            <Text
              fontSize="sm"
              mb={24}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              もっと読む
            </Text>
          )}
        </>
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
