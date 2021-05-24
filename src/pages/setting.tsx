import { Box, Button, Icon, Text, useColorMode } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useDeleteUser } from "../hooks/useDeleteUser";

const Config: NextPage = () => {
  const { deleteUser, processing } = useDeleteUser();
  const { colorMode } = useColorMode();

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        <Icon as={AiOutlineSetting} mr={2} w={6} h={6} />
        Setting
      </Text>

      <Box mb={16}>
        <Text fontSize="md" fontWeight="bold" mb={5}>
          データのエクスポート
        </Text>
        <Text fontSize="sm" mb={5}>
          あなたの引用データをcsv形式でダウンロードします。
        </Text>
        <Button
          onClick={() => deleteUser()}
          colorScheme="cyan"
          color={colorMode === "light" ? "white" : "black"}
          variant="solid"
          isLoading={processing}
        >
          CSVファイルに出力
        </Button>
      </Box>

      <Box mb={16}>
        <Text fontSize="md" fontWeight="bold" mb={5}>
          アカウントの削除
        </Text>
        <Text fontSize="sm" mb={5}>
          あなたが作成した引用やお気に入りに追加した引用はすべて削除されます。
        </Text>
        <Button
          onClick={() => deleteUser()}
          colorScheme="red"
          isLoading={processing}
        >
          アカウントを削除する
        </Button>
      </Box>
    </>
  );
};

export default Config;
