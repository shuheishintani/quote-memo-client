import { Spinner, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import router from "next/router";
import React, { useEffect } from "react";
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
      <Text fontSize="xl" mb={10}>
        新規作成
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
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/public/tags"
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
