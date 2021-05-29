import {
  Box,
  Button,
  Flex,
  Input,
  Switch,
  Text,
  Textarea,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BookSelectDrawer } from "../components/BookSelectDrawer";
import { QuoteInput } from "../dto/QuoteInput";
import { Book } from "../type/Book";
import { Quote } from "../type/Quote";
import { TagInput } from "./TagInput";

interface Props {
  initialQuote?: Quote;
  postQuote?: (postQuoteInput: QuoteInput) => Promise<boolean>;
  updateQuote?: (updateQuoteInput: QuoteInput, id: number) => Promise<boolean>;
  processing: boolean;
  registeredTags: string[];
}

const schema = yup.object().shape({
  text: yup
    .string()
    .required("本文を入力してください。")
    .max(400, "最大文字数は400文字です。"),
  page: yup.string().matches(/[0-9０-９]|^$/, "数字を入力してください。"),
});

const QuoteFrom: React.VFC<Props> = ({
  initialQuote,
  postQuote,
  updateQuote,
  processing,
  registeredTags,
}) => {
  const [book, setBook] = useState<Book | undefined>(
    initialQuote ? initialQuote.book : undefined
  );
  const [addedTags, setAddedTags] = useState<string[]>(
    initialQuote ? initialQuote.tags.map((tag) => tag.name) : []
  );
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      text: initialQuote ? initialQuote.text : "",
      page: initialQuote ? initialQuote.page : "",
      published: initialQuote ? initialQuote.published : false,
    },
    resolver: yupResolver(schema),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleBookSelect = (selectedBook: Book) => {
    setBook(selectedBook);
    const author = selectedBook.author.split("/")[0].replace(/\s+/g, "");
    setAddedTags([selectedBook.title, author]);
    onClose();
  };

  const onSubmit = async ({
    text,
    page,
    published,
  }: {
    text: string;
    page: string;
    published: boolean;
  }) => {
    if (!book) {
      return;
    }
    const postQuoteInput = {
      text,
      page: parseInt(page),
      published,
      book: {
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        cover_image_url: book.cover_image_url,
      },
      tags: addedTags.map((tag) => {
        return { name: tag };
      }),
    };

    if (postQuote) {
      const success = await postQuote(postQuoteInput);
      if (success) {
        toast({
          title: `新規作成しました！`,
          position: "top-left",
          status: "success",
          variant: "subtle",
          isClosable: true,
        });
        reset();
      }
    }

    const updateQuoteInput = {
      text,
      page: parseInt(page),
      published,
      tags: addedTags.map((tag) => {
        return { name: tag };
      }),
    };

    if (updateQuote && initialQuote) {
      const success = await updateQuote(updateQuoteInput, initialQuote.id);
      if (success) {
        toast({
          title: `編集内容を保存しました！`,
          position: "bottom-left",
          variant: "subtle",
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Box mb={10}>
        <Text mb={5} fontWeight="bold">
          出典
        </Text>
        {book ? (
          <Flex>
            <Image
              src={book.cover_image_url}
              width={105}
              height={148}
              key={book.isbn}
              onClick={() => handleBookSelect(book)}
            />
            <Box ml={5}>
              <Text fontSize="lg" mb={5}>
                {book.title}
              </Text>
              <Text mb={5}>{book.author}</Text>
              <Text>{book.publisher}</Text>
            </Box>
            {postQuote && (
              <Button
                ml="auto"
                colorScheme="cyan"
                color={colorMode === "light" ? "white" : "black"}
                onClick={onOpen}
                mb={10}
              >
                出典を探す
              </Button>
            )}
          </Flex>
        ) : (
          <Flex>
            <Text fontSize="sm">出典が選択されていません。</Text>
            <Button
              ml="auto"
              colorScheme="cyan"
              color={colorMode === "light" ? "white" : "black"}
              onClick={onOpen}
              mb={10}
            >
              出典を探す
            </Button>
          </Flex>
        )}
      </Box>

      <BookSelectDrawer
        setBook={setBook}
        setTags={setAddedTags}
        isOpen={isOpen}
        onClose={onClose}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <TagInput
          registeredTags={registeredTags}
          addedTags={addedTags}
          setAddedTags={setAddedTags}
        />

        <Box my={10}>
          <Text mb={2} fontWeight="bold">
            本文
          </Text>
          <Textarea name="text" placeholder="本文を入力..." ref={register} />
          <Text color="red.500" fontSize="xs">
            {errors.text && errors.text.message}
          </Text>
        </Box>

        <Box mb={10}>
          <Text mb={2} fontWeight="bold">
            ページ
          </Text>
          <Input
            name="page"
            variant="flushed"
            placeholder="ページを数字で入力..."
            size="md"
            autoComplete="off"
            ref={register}
          />
          <Text color="red.500" fontSize="xs">
            {errors.page && errors.page.message}
          </Text>
        </Box>

        <Box mb={10}>
          <Text mb={2} fontWeight="bold">
            公開する
          </Text>
          <Switch color="green" name="published" ref={register} />
        </Box>

        <Button
          type="submit"
          colorScheme="cyan"
          color={colorMode === "light" ? "white" : "black"}
          variant="solid"
          isLoading={processing}
          mb={20}
        >
          保存
        </Button>
      </form>
    </>
  );
};

export default QuoteFrom;
