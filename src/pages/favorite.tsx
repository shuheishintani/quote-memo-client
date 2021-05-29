import { Avatar, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FetchMoreButton } from "../components/FetchMoreButton";
import { PublicQuoteItem } from "../components/PublicQuoteItem";
import { useAuth } from "../hooks/useAuth";
import { useFavoriteQuotes } from "../hooks/useFavoriteQuotes";

interface Props {
  registeredTags: string[];
}

const Favorite: NextPage<Props> = () => {
  const { favoriteQuotes, setCurrentPage, fetching, nextFetching, next } =
    useFavoriteQuotes();
  const { user } = useAuth();

  if (!user) {
    return <Spinner />;
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
        {user.providerData[0]?.photoURL && (
          <Avatar size="xs" src={user.providerData[0]?.photoURL} mr={2} />
        )}
        <Text fontSize="xl">{user.displayName}</Text>
      </Flex>
      {fetching ? (
        <Spinner />
      ) : (
        <>
          {favoriteQuotes.length === 0 ? (
            <Text>お気に入りに追加された引用は存在しません。</Text>
          ) : (
            <>
              {favoriteQuotes.map((quote) => (
                <PublicQuoteItem key={quote.id} quote={quote} />
              ))}
            </>
          )}

          <FetchMoreButton
            setCurrentPage={setCurrentPage}
            nextFetching={nextFetching}
            next={next}
          />
        </>
      )}
    </>
  );
};

export default Favorite;
