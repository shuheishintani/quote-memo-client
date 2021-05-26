import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import React from "react";
import { CgQuoteO } from "react-icons/cg";
import { PublicQuoteItem } from "../../components/PublicQuoteItem";
import { Book } from "../../type/Book";
import { User } from "../../type/User";

interface Props {
  user: User;
}

const UserDetail: NextPage<Props> = ({ user }) => {
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
      {user &&
        user.quotes?.map((quote) => (
          <PublicQuoteItem key={quote.id} quote={quote} />
        ))}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/users"
  );
  const users = await response.json();
  const paths = users.map((book: Book) => ({
    params: { id: book.id?.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/users/${params?.id}`
  );
  const user = await response.json();
  return {
    props: { user },
  };
};

export default UserDetail;
