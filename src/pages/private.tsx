import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { FetchMoreButton } from "../components/FetchMoreButton";
import { QuoteItem } from "../components/QuoteItem";
import { TagInput } from "../components/TagInput";
import { useAuth } from "../hooks/useAuth";
import { useQuotes } from "../hooks/useQuotes";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Index: NextPage<Props> = ({ registeredTags }) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const { quotes, setCurrentPage, fetching, nextFetching, next } =
    useQuotes(addedTags);
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
          {user?.displayName} / Private
        </Text>
      </Flex>

      {user && (
        <>
          <TagInput
            registeredTags={registeredTags}
            addedTags={addedTags}
            setAddedTags={setAddedTags}
            setCurrentPage={setCurrentPage}
          />
          <Box mt={24} />
          {fetching ? (
            <Spinner />
          ) : (
            <>
              {quotes &&
                quotes.map((quote) => (
                  <QuoteItem
                    key={quote.id}
                    quote={quote}
                    setAddedTags={setAddedTags}
                  />
                ))}
              <FetchMoreButton
                setCurrentPage={setCurrentPage}
                nextFetching={nextFetching}
                next={next}
              />
            </>
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
