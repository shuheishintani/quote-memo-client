import { Avatar, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
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
      <Flex align="center" mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mr={2}>
          <Icon as={AiOutlineHeart} mr={2} w={6} h={6} />
          Favorite
        </Text>
        <Text fontSize="xl" mr={2}>
          /
        </Text>
        <Avatar
          size="xs"
          name={user?.displayName || undefined}
          src={user?.providerData[0]?.photoURL || undefined}
          mr={2}
        />
        <Text fontSize="xl">{user?.displayName}</Text>
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

export default Favorite;
