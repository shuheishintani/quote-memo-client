import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAddFavoriteQuote } from "../hooks/useAddFavoriteQuote";
import { useRemoveFavoriteQuote } from "../hooks/useRemoveFavoriteQuote";
import { Quote } from "../type/Quote";
import { TagList } from "./TagList";

interface Props {
  quote: Quote;
  setAddedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  favoriteQuotes?: Quote[];
}

export const PublicQuoteItem: React.VFC<Props> = ({
  quote,
  setAddedTags,
  favoriteQuotes,
}) => {
  const { addFavoriteQuote, processing: addProcessing } = useAddFavoriteQuote();
  const { removeFavoriteQuote, processing: removeProcessing } =
    useRemoveFavoriteQuote();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isFavorite = favoriteQuotes
      ?.map((quote) => quote.id)
      .includes(quote.id);
    if (isFavorite) {
      setIsFavorite(true);
    }
  }, [favoriteQuotes, quote]);

  const handleLike = async () => {
    const success = await addFavoriteQuote(quote.id);
    if (success) {
      setIsFavorite(true);
    }
  };

  const handleUnlike = async () => {
    const success = await removeFavoriteQuote(quote.id);
    if (success) {
      setIsFavorite(false);
    }
  };

  return (
    <>
      <Box key={quote.id} mb={10}>
        <Divider mb={5} />
        {quote.user.id !== "" && (
          <Flex align="center" mb={5}>
            <Text fontSize="xs" mr={2}>
              Created by
            </Text>
            <NextLink href={`/users/${quote.user.id}`}>
              <Avatar
                size="xs"
                name={quote.user.username || undefined}
                src={quote.user.profile_image_url}
                mr={5}
                cursor="pointer"
              />
            </NextLink>

            {!favoriteQuotes ? (
              <></>
            ) : addProcessing || removeProcessing ? (
              <Spinner size="sm" />
            ) : isFavorite ? (
              <Icon
                as={AiFillHeart}
                color="red.500"
                cursor="pointer"
                onClick={handleUnlike}
              />
            ) : (
              <Icon
                as={AiOutlineHeart}
                color="gray.500"
                cursor="pointer"
                onClick={handleLike}
              />
            )}
          </Flex>
        )}

        <Flex>
          <TagList
            tags={quote.tags.map((tag) => tag.name)}
            setAddedTags={setAddedTags}
          />
        </Flex>
        <Box mb={4} />
        <Text fontSize="md">{quote.text}</Text>

        <Box mb={4} />
        {quote.book.id !== 0 && (
          <Flex align="center">
            <NextLink href={`/books/${quote.book.id}`}>
              <Text fontSize="sm" ml="auto" cursor="pointer" isTruncated>
                ──{" "}
                <Link>
                  {quote.book.author.split("/")[0].replace(/\s+/g, "")}『
                  {quote.book.title}』
                </Link>
              </Text>
            </NextLink>
          </Flex>
        )}
      </Box>
    </>
  );
};
