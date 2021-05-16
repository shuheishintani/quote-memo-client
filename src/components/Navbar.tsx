import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  Spinner,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useSignout } from "../hooks/useSignout";
import { useSignin } from "../hooks/useSignin";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Navbar: React.VFC = () => {
  const { user } = useAuth();
  const { signin } = useSignin();
  const { signout } = useSignout();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleLogout = async () => {
    onOpen();
    await signout();
    onClose();
  };

  return (
    <Flex zIndex={2} position="sticky" top={0} bg="teal" p={4} align="center">
      <NextLink href="/">
        <Link fontSize="xl" color="white">
          QuoteMemo
        </Link>
      </NextLink>

      <Box ml={"auto"}>
        <Flex align="center">
          {user && (
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => router.push("/create")}
              mr={5}
            >
              新規作成
            </Button>
          )}

          <DarkModeSwitch />
          <Box mr={5} />
          {user ? (
            <Menu>
              <MenuButton
                as={WrapItem}
                righticon={<ChevronDownIcon />}
                cursor="pointer"
              >
                <Box>
                  <Avatar
                    size="sm"
                    name={user.displayName || undefined}
                    src={user.providerData[0]?.photoURL || undefined}
                  />
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/my_quotes")}>
                  マイ引用
                </MenuItem>
                <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                <MenuItem>設定</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex>
              <Button colorScheme="teal" variant="solid" onClick={signin}>
                ログイン
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Flex align="center" justify="center">
          <Spinner mx="auto" />
        </Flex>
      </Modal>
    </Flex>
  );
};
