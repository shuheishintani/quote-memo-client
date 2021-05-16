import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Quote } from "../type/Quote";
import { TagList } from "./TagList";

interface Props {
  quote: Quote;
  setAddedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PublicQuoteItem: React.VFC<Props> = ({ quote, setAddedTags }) => {
  return (
    <>
      <Box key={quote.id} mb={10}>
        <Divider mb={5} />
        <Flex>
          <TagList
            tags={quote.tags.map((tag) => tag.name)}
            setAddedTags={setAddedTags}
          />
        </Flex>
        <Box mb={4} />
        <Text fontSize="md">{quote.text}</Text>

        <Box mb={4} />
        <Flex align="bottom">
          <Avatar
            size="xs"
            name={quote.user.username || undefined}
            src={quote.user.profile_image_url}
          />
          <Box mr={2} />
          <Text fontSize="sm">{quote.user.username}さんが公開しました。</Text>
          <Text fontSize="sm" ml="auto">
            ── {quote.book.author.split("/")[0].replace(/\s+/g, "")}『
            {quote.book.title}』
          </Text>
        </Flex>
      </Box>
    </>
  );
};
