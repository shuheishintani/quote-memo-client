import { Flex, Box, Text, Icon, Link } from "@chakra-ui/react";
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
import { RiBookReadLine } from "react-icons/ri";

interface Props {
  book: Book;
}

const toISBN10 = (isbn13: string) => {
  const src = isbn13.slice(3, 12);

  const sum = src
    .split("")
    .map((s: string) => parseInt(s))
    .reduce((p, c, i) => (i === 1 ? p * 10 : p) + c * (10 - i));

  const rem = 11 - (sum % 11);
  const checkdigit = rem === 11 ? 0 : rem === 10 ? "X" : rem;

  return `${src}${checkdigit}`;
};

const BookDetail: NextPage<Props> = ({ book }) => {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        <Icon as={RiBookReadLine} mr={2} w={6} h={6} />
        {book.title}
      </Text>
      <Flex mb={10}>
        <Box
          cursor="pointer"
          onClick={() => {
            window.open(
              `http://www.amazon.co.jp/dp/${toISBN10(book.isbn)}`,
              "_blank",
              "noopener"
            );
          }}
        >
          <Image
            src={book.cover_image_url}
            width={105}
            height={148}
            key={book.isbn}
          />
        </Box>

        <Box ml={5}>
          <Link>
            <Text
              fontSize="lg"
              mb={5}
              onClick={() => {
                window.open(
                  `http://www.amazon.co.jp/dp/${toISBN10(book.isbn)}`,
                  "_blank",
                  "noopener"
                );
              }}
            >
              {book.title}
            </Text>
          </Link>

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
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/books"
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
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/books/${params?.id}`
  );
  const book = await response.json();
  return {
    props: { book },
  };
};

export default BookDetail;
