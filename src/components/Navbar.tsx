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
  Text,
  useColorMode,
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
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#1B212C" };

  const handleLogout = async () => {
    onOpen();
    await signout();
    onClose();
  };

  return (
    <Box zIndex={2} top={0} position="sticky" bg={bgColor[colorMode]}>
      <Flex p={4} align="center">
        <NextLink href="/">
          <Link fontSize="xl" fontWeight="bold">
            QuoteMemo
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <Flex align="center">
            {user && (
              <Button
                colorScheme="cyan"
                color={colorMode === "light" ? "white" : "black"}
                variant="solid"
                onClick={() => router.push("/create")}
                mr={5}
              >
                Add new
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
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem>Config</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex>
                <Button
                  colorScheme="cyan"
                  color={colorMode === "light" ? "white" : "black"}
                  variant="solid"
                  onClick={signin}
                >
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
      <Flex>
        <Text
          mx={5}
          pb={3}
          borderBottom={router.pathname === "/" ? "2px" : "0px"}
          borderColor="cyan"
          cursor="pointer"
          onClick={() => router.push("/")}
        >
          Public
        </Text>
        {user && (
          <Text
            mr={5}
            pb={3}
            borderBottom={router.pathname === "/my_quotes" ? "2px" : "0px"}
            borderColor="cyan"
            cursor="pointer"
            onClick={() => router.push("/my_quotes")}
          >
            Private
          </Text>
        )}
      </Flex>
    </Box>
  );
};
