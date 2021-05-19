import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDeleteQuote } from "../hooks/useDeleteQuote";
import { useUpdateQuote } from "../hooks/useUpdateQuote";
import { Quote } from "../type/Quote";
import { TagList } from "./TagList";

interface Props {
  quote: Quote;
  setAddedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const QuoteItem: React.VFC<Props> = ({ quote, setAddedTags }) => {
  const { deleteQuote, loading: isDeleting } = useDeleteQuote();
  const { updateQuote, processing: isUpdating } = useUpdateQuote();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const handlePublish = (id: number) => {
    updateQuote({ ...quote, published: !quote.published }, id);
    console.log("hoge");
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              確認
            </AlertDialogHeader>
            <AlertDialogBody>本当に削除しますか？</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteQuote(quote.id);
                  onClose();
                }}
                ml={3}
              >
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
            aria-label="DeleteIcon"
            icon={<EditIcon />}
            mr={4}
            onClick={() => router.push(`/edit/${quote.id}`)}
          />
          <IconButton
            aria-label="DeleteIcon"
            icon={<DeleteIcon />}
            onClick={() => setIsOpen(true)}
            isLoading={isDeleting}
          />
        </Flex>
        <Box mb={4} />
        <Text fontSize="md">{quote.text}</Text>

        <Box mb={4} />
        <Flex>
          <Text fontSize="sm" ml="auto">
            ── {quote.book.author.split("/")[0].replace(/\s+/g, "")}『
            {quote.book.title}』
          </Text>
        </Flex>
      </Box>
    </>
  );
};
