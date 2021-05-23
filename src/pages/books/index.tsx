import { Box, Icon, Input, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiBook3Line } from "react-icons/ri";
import { useGetBooks } from "../../hooks/useGetBooks";
import { Book } from "../../type/Book";

interface Props {
  initialBooks: Book[];
}

const Books: NextPage<Props> = ({ initialBooks }) => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const { getBooks } = useGetBooks();

  useEffect(() => {
    setBooks(initialBooks);
  }, []);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async () => {
    const books = await getBooks(keyword);
    const arrangedBooks = books
      .sort((a, b) => {
        if (a.quotes && b.quotes) {
          if (a.quotes.length > b.quotes.length) return -1;
          if (a.quotes.length <= b.quotes.length) return 1;
        }
        return 1;
      })
      .filter((book) => book.quotes?.length !== 0);
    setBooks(arrangedBooks);
  };

  console.log(books);
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        <Icon as={RiBook3Line} mr={2} w={6} h={6} />
        Books
      </Text>
      <Text fontWeight="bold">書籍検索</Text>
      <Input
        variant="flushed"
        placeholder="タイトル・著者名を入力..."
        size="md"
        mb={24}
        onChange={handleChangeKeyword}
        onKeyPress={handleSubmit}
        maxLength={30}
      />
      <Wrap spacing="20px">
        {books &&
          books.map((book) => (
            <WrapItem key={book.id}>
              {book.cover_image_url && (
                <Box>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Box boxShadow="lg" mb={3} cursor="pointer">
                      <Image
                        src={book.cover_image_url}
                        width={105}
                        height={148}
                        onClick={() => router.push(`/books/${book.id}`)}
                      />
                    </Box>
                  </motion.div>
                  <Text fontSize="sm" align="center">
                    （{book.quotes?.length}件の引用）
                  </Text>
                </Box>
              )}
            </WrapItem>
          ))}
      </Wrap>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/public/books"
  );
  const books: Book[] = await response.json();
  const arrangedBooks = books
    .sort((a, b) => {
      if (a.quotes && b.quotes) {
        if (a.quotes.length > b.quotes.length) return -1;
        if (a.quotes.length <= b.quotes.length) return 1;
      }
      return 1;
    })
    .filter((book) => book.quotes?.length !== 0);
  return {
    props: { initialBooks: arrangedBooks },
  };
};

export default Books;
