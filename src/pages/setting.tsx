import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useGetPrivateQuotesForExport } from "../hooks/useGetPrivateQuotesForExport";

const Config: NextPage = () => {
  const { deleteUser, processing } = useDeleteUser();
  const { colorMode } = useColorMode();
  const { getPrivateQuotesForExport } = useGetPrivateQuotesForExport();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const handleExport = async () => {
    const quotes = await getPrivateQuotesForExport();
    const json = JSON.stringify(quotes);
    const blob = new Blob([json], { type: "text/plain" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    const m = moment();
    const date = m.format("YYYYMMDD");
    link.download = `${date}_${user?.displayName}_quotes.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    const success = await deleteUser();
    if (success) {
      toast({
        title: `ユーザーを削除しました`,
        position: "bottom-left",
        status: "info",
        variant: "subtle",
        isClosable: true,
      });
      router.push("/");
    }
  };

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
          あなたの引用データをjson形式でダウンロードします。
        </Text>

        <Button
          colorScheme="cyan"
          color={colorMode === "light" ? "white" : "black"}
          variant="solid"
          onClick={handleExport}
        >
          ダウンロード
        </Button>
      </Box>

      <Box mb={16}>
        <Text fontSize="md" fontWeight="bold" mb={5}>
          アカウントの削除
        </Text>
        <Text fontSize="sm" mb={5}>
          あなたが作成した引用やお気に入りに追加した引用はすべて削除されます。
        </Text>
        <Button colorScheme="red" onClick={() => setIsOpen(true)}>
          アカウントを削除する
        </Button>
      </Box>

      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                アカウントの削除
              </AlertDialogHeader>

              <AlertDialogBody>
                削除されたデータは復元することができません。本当によろしいですか？
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  キャンセル
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={handleDelete}
                  isLoading={processing}
                >
                  削除する
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </>
  );
};

export default Config;
