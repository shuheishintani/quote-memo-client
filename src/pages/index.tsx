import { Box, Icon, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { AiOutlineTag } from "react-icons/ai";
import { FetchMoreButton } from "../components/FetchMoreButton";
import { PublicQuotesList } from "../components/PublicQuotesList";
import { PublicQuotesListWithAuth } from "../components/PublicQuotesListWithAuth";
import { TagInput } from "../components/TagInput";
import { useAuth } from "../hooks/useAuth";
import { useFavoriteQuotes } from "../hooks/useFavoriteQuotes";
import { usePublicQuotes } from "../hooks/usePublicQuotes";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Index: NextPage<Props> = ({ registeredTags }) => {
  const {
    publicQuotes,
    fetching,
    nextFetching,
    next,
    setCurrentPage,
    addedTags,
    setAddedTags,
  } = usePublicQuotes();
  const { favoriteQuotes } = useFavoriteQuotes();
  const { user } = useAuth();

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        <Icon as={AiOutlineTag} mr={2} w={6} h={6} />
        Tags
      </Text>

      <TagInput
        registeredTags={registeredTags}
        addedTags={addedTags}
        setAddedTags={setAddedTags}
        setCurrentPage={setCurrentPage}
      />
      <Box mt={24} />
      <>
        {fetching ? (
          <Spinner mb={24} />
        ) : (
          <>
            {user ? (
              <PublicQuotesListWithAuth
                publicQuotes={publicQuotes}
                setAddedTags={setAddedTags}
                favoriteQuotes={favoriteQuotes}
              />
            ) : (
              <PublicQuotesList
                publicQuotes={publicQuotes}
                setAddedTags={setAddedTags}
              />
            )}
            <PublicQuotesList
              publicQuotes={publicQuotes}
              setAddedTags={setAddedTags}
            />
            <FetchMoreButton
              setCurrentPage={setCurrentPage}
              nextFetching={nextFetching}
              next={next}
            />
          </>
        )}
      </>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tagsResponse = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/tags"
  );
  const tags = await tagsResponse.json();
  const strTags = tags.map((tag: Tag) => tag.name);

  return {
    props: {
      registeredTags: strTags,
    },
  };
};

export default Index;
