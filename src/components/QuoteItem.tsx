import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Link,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDeleteQuote } from "../hooks/useDeleteQuote";
import { useUpdateQuote } from "../hooks/useUpdateQuote";
import { Quote } from "../type/Quote";
import { TagList } from "./TagList";

interface Props {
  quote: Quote;
  setAddedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
}

export const QuoteItem: React.VFC<Props> = ({
  quote,
  setAddedTags,
  setQuotes,
}) => {
  const { deleteQuote, loading: isDeleting } = useDeleteQuote();
  const { updateQuote, processing: isUpdating } = useUpdateQuote();
  const router = useRouter();
  const [beforeDelete, setBeforeDelete] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const textColor = { light: "black", dark: "white" };

  useEffect(() => {
    let unmounted = false;
    if (beforeDelete) {
      setTimeout(() => {
        if (!unmounted) {
          setBeforeDelete(false);
        }
      }, 2000);
    }
    return () => {
      unmounted = true;
    };
  }, [beforeDelete]);

  const handlePublish = (id: number) => {
    updateQuote({ ...quote, published: !quote.published }, id);
  };

  const handleDelete = (id: number) => {
    if (!beforeDelete) {
      setBeforeDelete(true);
    } else {
      setBeforeDelete(false);
      const success = deleteQuote(id);
      if (success) {
        setQuotes((prev) => prev.filter((quote) => quote.id !== id));
      }
    }
  };

  return (
    <>
      <Box key={quote.id} mb={10}>
        <Divider mb={5} />
        <Flex>
          <TagList
            tags={quote.tags?.map((tag) => tag.name)}
            setAddedTags={setAddedTags}
          />
          {quote.published ? (
            <IconButton
              aria-label="ViewIcon"
              icon={<ViewIcon />}
              ml="auto"
              mr={4}
              onClick={() => handlePublish(quote.id)}
              isLoading={isUpdating}
            />
          ) : (
            <IconButton
              aria-label="ViewOffIcon"
              icon={<ViewOffIcon />}
              ml="auto"
              mr={4}
              onClick={() => handlePublish(quote.id)}
              isLoading={isUpdating}
            />
          )}

          <IconButton
            aria-label="EditIcon"
            icon={<EditIcon />}
            mr={4}
            onClick={() => router.push(`/edit/${quote.id}`)}
          />

          <Tooltip label={beforeDelete ? "Click to confirm" : ""} fontSize="md">
            <IconButton
              aria-label="DeleteIcon"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(quote.id)}
              isLoading={isDeleting}
              color={beforeDelete ? "red.500" : textColor[colorMode]}
            />
          </Tooltip>
        </Flex>
        <Box mb={4} />
        <Text fontSize="md">{quote.text}</Text>

        <Box mb={4} />
        <Flex>
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
      </Box>
    </>
  );
};
