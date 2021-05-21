import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { PublicQuoteItem } from "../components/PublicQuoteItem";
import { useAuth } from "../hooks/useAuth";
import { useFavoriteQuotes } from "../hooks/useFavoriteQuotes";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Favorite: NextPage<Props> = ({ registeredTags }) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const { favoriteQuotes, loading } = useFavoriteQuotes();
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
          {user?.displayName} / Favorite Quotes
        </Text>
      </Flex>
      {/* <TagInput
        registeredTags={registeredTags}
        addedTags={addedTags}
        setAddedTags={setAddedTags}
      />
      <Box mt={24} /> */}
      {favoriteQuotes && !loading ? (
        favoriteQuotes.map((quote) => (
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

export default Favorite;
