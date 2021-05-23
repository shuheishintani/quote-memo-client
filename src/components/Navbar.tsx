import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHeart, AiOutlineSetting, AiOutlineTag } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { CgQuoteO } from "react-icons/cg";
import { GrFormAdd } from "react-icons/gr";
import { RiBook3Line, RiQuillPenLine } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";
import { useSignin } from "../hooks/useSignin";
import { useSignout } from "../hooks/useSignout";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Navbar: React.VFC = () => {
  const { user } = useAuth();
  const { signin } = useSignin();
  const { signout } = useSignout();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#1B212C" };
  const textColor = { light: "black", dark: "white" };

  const handleLogout = async () => {
    onOpen();
    await signout();
    onClose();
  };

  return (
    <Box zIndex={2} top={0} position="sticky" bg={bgColor[colorMode]}>
      <Flex p={4} align="center">
        <Icon as={RiQuillPenLine} cursor="pointer" mr={2} w={6} h={6} />
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
                  <MenuItem onClick={handleLogout}>
                    <Icon
                      as={BiLogOutCircle}
                      mr={2}
                      w={5}
                      h={5}
                      color="gray.500"
                    />
                    Logout
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/config")}>
                    <Icon
                      as={AiOutlineSetting}
                      mr={2}
                      w={5}
                      h={5}
                      color="gray.500"
                    />
                    Config
                  </MenuItem>
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
                  Login
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
          color={router.pathname === "/" ? textColor[colorMode] : "gray.500"}
          borderColor="cyan"
          cursor="pointer"
          onClick={() => router.push("/")}
        >
          <Icon as={AiOutlineTag} mr={1} w={4} h={4} />
          Tags
        </Text>
        <Text
          mr={5}
          pb={3}
          borderBottom={router.pathname === "/books" ? "2px" : "0px"}
          color={
            router.pathname === "/books" ? textColor[colorMode] : "gray.500"
          }
          borderColor="cyan"
          cursor="pointer"
          onClick={() => router.push("/books")}
        >
          <Icon as={RiBook3Line} mr={1} w={4} h={4} />
          Books
        </Text>
        {user && (
          <>
            <Text
              mr={5}
              pb={3}
              borderBottom={router.pathname === "/private" ? "2px" : "0px"}
              color={
                router.pathname === "/private"
                  ? textColor[colorMode]
                  : "gray.500"
              }
              borderColor="cyan"
              cursor="pointer"
              onClick={() => router.push("/private")}
            >
              <Icon as={CgQuoteO} mr={1} w={4} h={4} />
              My quotes
            </Text>
            <Text
              mr={5}
              pb={3}
              borderBottom={router.pathname === "/favorite" ? "2px" : "0px"}
              color={
                router.pathname === "/favorite"
                  ? textColor[colorMode]
                  : "gray.500"
              }
              borderColor="cyan"
              cursor="pointer"
              onClick={() => router.push("/favorite")}
            >
              <Icon as={AiOutlineHeart} mr={1} w={4} h={4} />
              Favorite
            </Text>
          </>
        )}
      </Flex>
    </Box>
  );
};
