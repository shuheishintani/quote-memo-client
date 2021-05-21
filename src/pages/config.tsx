import { NextPage } from "next";
import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useDeleteUser } from "../hooks/useDeleteUser";

const Config: NextPage = () => {
  const { deleteUser, processing } = useDeleteUser();

  return (
    <>
      <Text fontSize="xl" mb={10} fontWeight="bold">
        Config
      </Text>
      <Button onClick={() => deleteUser()} isLoading={processing}>
        退会する
      </Button>
    </>
  );
};

export default Config;
