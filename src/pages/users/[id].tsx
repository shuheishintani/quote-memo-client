import { Avatar, Flex, Text } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import React from "react";
import { PublicQuoteItem } from "../../components/PublicQuoteItem";
import { Book } from "../../type/Book";
import { User } from "../../type/User";

interface Props {
  user: User;
}

const UserDetail: NextPage<Props> = ({ user }) => {
  return (
    <>
      <Flex>
        <Avatar
          size="sm"
          name={user?.username || undefined}
          src={user?.profile_image_url || undefined}
          mr={2}
        />
        <Text fontSize="xl" mb={10} fontWeight="bold">
          {user?.username} / Public quotes
        </Text>
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
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/public/users"
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
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/public/users/${params?.id}`
  );
  const user = await response.json();
  return {
    props: { user },
  };
};

export default UserDetail;
