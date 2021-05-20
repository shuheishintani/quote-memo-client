import { Flex, Box, Text } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import React from "react";
import { Book } from "../../type/Book";
import Image from "next/image";
import { PublicQuoteItem } from "../../components/PublicQuoteItem";

interface Props {
  book: Book;
}

const BookDetail: NextPage<Props> = ({ book }) => {
  console.log(book);
  return (
    <>
      <Text fontSize="xl" mb={10} fontWeight="bold">
        Book Detail
      </Text>
      <Flex mb={10}>
        <Image
          src={book.cover_image_url}
          width={105}
          height={148}
          key={book.isbn}
        />
        <Box ml={5}>
          <Text fontSize="lg" mb={5}>
            {book.title}
          </Text>
          <Text mb={5}>{book.author}</Text>
          <Text>{book.publisher}</Text>
        </Box>
      </Flex>
      {book &&
        book.quotes?.map((quote) => (
          <PublicQuoteItem key={quote.id} quote={quote} />
        ))}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/public/books"
  );
  const books = await response.json();
  const paths = books.map((book: Book) => ({
    params: { id: book.id?.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/public/books/${params?.id}`
  );
  const book = await response.json();
  return {
    props: { book },
  };
};

export default BookDetail;
