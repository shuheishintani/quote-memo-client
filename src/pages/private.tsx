import { Avatar, Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { CgQuoteO } from "react-icons/cg";
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
  const { quotes, setQuotes, setCurrentPage, fetching, nextFetching, next } =
    useQuotes(addedTags);
  const { user } = useAuth();

  if (!user) {
    return <Spinner />;
  }

  return (
    <>
      <Flex align="center" mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mr={2}>
          <Icon as={CgQuoteO} mr={2} w={6} h={6} />
          Quotes
        </Text>
        <Text fontSize="xl" mr={2}>
          /
        </Text>
        {user.providerData[0]?.photoURL && (
          <Avatar size="xs" src={user.providerData[0]?.photoURL} mr={2} />
        )}
        <Text fontSize="xl">{user.displayName}</Text>
      </Flex>

      {
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
                    setQuotes={setQuotes}
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
      }
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/tags"
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
