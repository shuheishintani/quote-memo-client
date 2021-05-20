import { Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BiMoon } from "react-icons/bi";
import { FaSun } from "react-icons/fa";

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
