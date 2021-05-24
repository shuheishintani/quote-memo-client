import { Icon, Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import router from "next/router";
import React, { useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import QuoteForm from "../components/QuoteForm";
import { useAuth } from "../hooks/useAuth";
import { usePostQuote } from "../hooks/usePostQuote";
import { Tag } from "../type/Tag";

interface Props {
  registeredTags: string[];
}

const Create: NextPage<Props> = ({ registeredTags }) => {
  const { postQuote, processing } = usePostQuote();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
    return;
  }, [user, loading]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mr={2} mb={10}>
        <Icon as={AiOutlineFileAdd} mr={2} w={6} h={6} />
        Add new
      </Text>
      {user && (
        <QuoteForm
          postQuote={postQuote}
          processing={processing}
          registeredTags={registeredTags}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/tags"
  );
  const data = await response.json();
  const registeredTags = data.map((tag: Tag) => tag.name);
  return {
    props: {
      registeredTags: registeredTags,
    },
  };
};

export default Create;
