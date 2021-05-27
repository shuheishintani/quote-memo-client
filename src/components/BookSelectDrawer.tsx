import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
  useColorMode,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import _ from "lodash";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { QuotesContext } from "../context/QuotesContext";
import { useGetExternalBooks } from "../hooks/useGetExternalBooks";
import { Book } from "../type/Book";

interface Props {
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  isOpen: boolean;
  onClose: () => void;
}

export const BookSelectDrawer: React.VFC<Props> = ({
  setBook,
  setTags,
  isOpen,
  onClose,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { getExternalBooks } = useGetExternalBooks();
  const [keyword, setKeyword] = useState("");
  const firstField = React.createRef<HTMLInputElement>();
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.900" };
  const color = { light: "black", dark: "white" };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setLoading(true);
      e.preventDefault();
      const fetchBooksInput = {
        title: keyword,
        author: "",
        page: "1",
      };
      const books = await getExternalBooks(fetchBooksInput);
      setLoading(false);
      setBooks(books);
    }
  };

  const handleBookSelect = (selectedBook: Book) => {
    setBook(selectedBook);
    const author = selectedBook.author.split("/")[0].replace(/\s+/g, "");
    setTags([selectedBook.title, author]);
    onClose();
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColor[colorMode]} color={color[colorMode]}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <SearchIcon mr={2} />
              <Text>出典を探す</Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <Text mb={2}>タイトル</Text>
                <Input
                  variant="flushed"
                  placeholder="タイトルを入力..."
                  size="md"
                  mb={5}
                  label="Search"
                  onChange={handleChangeKeyword}
                  onKeyPress={handleSearch}
                  ref={firstField}
                />
                {loading && <Spinner />}
                {!loading && (
                  <Wrap spacing="20px">
                    {books.map((book, i) => (
                      <motion.div whileHover={{ scale: 1.1 }} key={i}>
                        <Box boxShadow="lg">
                          <WrapItem>
                            {book.cover_image_url && (
                              <Image
                                src={book.cover_image_url}
                                width={105}
                                height={148}
                                onClick={() => handleBookSelect(book)}
                              />
                            )}
                          </WrapItem>
                        </Box>
                      </motion.div>
                    ))}
                  </Wrap>
                )}
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              キャンセル
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
