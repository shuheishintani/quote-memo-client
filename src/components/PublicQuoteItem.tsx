import { Avatar, Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUser } from "../hooks/useUser";
import { Quote } from "../type/Quote";
import { TagList } from "./TagList";

interface Props {
  quote: Quote;
  setAddedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PublicQuoteItem: React.VFC<Props> = ({ quote, setAddedTags }) => {
  const { user } = useUser();

  const isFavorite = user?.favorite_quotes
    ?.map((quote) => quote.id)
    .includes(quote.id);

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
          {isFavorite ? (
            <Icon as={AiFillHeart} color="red.500" cursor="pointer" />
          ) : (
            <Icon as={AiOutlineHeart} color="gray.500" cursor="pointer" />
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
