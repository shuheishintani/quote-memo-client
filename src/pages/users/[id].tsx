import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import React, { useEffect, useState } from "react";
import { CgQuoteO } from "react-icons/cg";
import { FetchMoreButton } from "../../components/FetchMoreButton";
import { PublicQuoteItem } from "../../components/PublicQuoteItem";
import { Book } from "../../type/Book";
import { Quote } from "../../type/Quote";
import { User } from "../../type/User";
import axios from "axios";

interface Props {
  user: User;
}

const UserDetail: NextPage<Props> = ({ user }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [next, setNext] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (quotes.length % 5 !== 0) {
      setNext(false);
    } else {
      setNext(true);
    }
  }, [quotes]);

  useEffect(() => {
    if (user.quotes) {
      setQuotes(user.quotes?.slice(0, 10 * currentPage));
    }
  }, [currentPage]);

  if (!user) {
    <></>;
  }

  return (
    <>
      <Flex align="center" mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mr={2}>
          <Icon as={CgQuoteO} mr={2} w={6} h={6} />
          Quotes
        </Text>
        <Text fontSize="xl" mr={2}>
          /
        </Text>
        {user.profile_image_url && (
          <Avatar size="xs" src={user.profile_image_url} mr={2} />
        )}
        <Text fontSize="xl">{user.username}</Text>
      </Flex>
      {quotes.map((quote) => (
        <PublicQuoteItem key={quote.id} quote={quote} />
      ))}
      <FetchMoreButton next={next} setCurrentPage={setCurrentPage} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/users"
  );
  const paths = response.data.map((book: Book) => ({
    params: { id: book.id?.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/users/${params?.id}`
  );

  return {
    props: { user: response.data },
  };
};

export default UserDetail;
