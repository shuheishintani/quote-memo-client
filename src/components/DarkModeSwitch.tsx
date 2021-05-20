import { Icon, Switch, useColorMode } from "@chakra-ui/react";
import { FaSun } from "react-icons/fa";
import { BiMoon } from "react-icons/bi";
import React from "react";
import { RiQuillPenLine } from "react-icons/ri";

export const DarkModeSwitch: React.VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <>
      {isDark ? (
        <Icon
          as={FaSun}
          cursor="pointer"
          mr={2}
          w={6}
          h={6}
          onClick={toggleColorMode}
        />
      ) : (
        <Icon
          as={BiMoon}
          cursor="pointer"
          mr={2}
          w={6}
          h={6}
          onClick={toggleColorMode}
        />
      )}
    </>
  );
};
