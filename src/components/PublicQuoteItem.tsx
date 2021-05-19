import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAddFavoriteQuote } from "../hooks/useAddFavoriteQuote";
import { useUser } from "../hooks/useUser";
import { Quote } from "../type/Quote";
import { TagList } from "./TagList";

interface Props {
  quote: Quote;
  setAddedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PublicQuoteItem: React.VFC<Props> = ({ quote, setAddedTags }) => {
  const { user } = useUser();
  const { addFavoriteQuote, processing } = useAddFavoriteQuote();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isFavorite = user?.favorite_quotes
      ?.map((quote) => quote.id)
      .includes(quote.id);
    if (isFavorite) {
      setIsFavorite(true);
    }
  }, [user, quote]);

  const handleLike = async () => {
    const success = await addFavoriteQuote(quote.id);
    if (success) {
      setIsFavorite(true);
    }
  };

  return (
    <>
      <Box key={quote.id} mb={10}>
        <Divider mb={5} />
        <Flex align="center" mb={5}>
          <Text fontSize="xs" mr={2}>
            Created by
          </Text>
          <Avatar
            size="xs"
            name={quote.user.username || undefined}
            src={quote.user.profile_image_url}
            mr={5}
          />
          {!user ? (
            <></>
          ) : processing ? (
            <Spinner size="sm" />
          ) : isFavorite ? (
            <Icon as={AiFillHeart} color="red.500" cursor="pointer" />
          ) : (
            <Icon
              as={AiOutlineHeart}
              color="gray.500"
              cursor="pointer"
              onClick={handleLike}
            />
          )}
        </Flex>

        <Flex>
          <TagList
            tags={quote.tags.map((tag) => tag.name)}
            setAddedTags={setAddedTags}
          />
        </Flex>
        <Box mb={4} />
        <Text fontSize="md">{quote.text}</Text>

        <Box mb={4} />
        <Flex align="center">
          <Text fontSize="sm" ml="auto" isTruncated>
            ── {quote.book.author.split("/")[0].replace(/\s+/g, "")}『
            {quote.book.title}』
          </Text>
        </Flex>
      </Box>
    </>
  );
};
