import { Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BiMoon } from "react-icons/bi";
import { FiSun } from "react-icons/fi";

export const DarkModeSwitch: React.VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <>
      {isDark ? (
        <Icon
          as={FiSun}
          cursor="pointer"
          mr={2}
          w={6}
          h={6}
          color="gray.400"
          onClick={toggleColorMode}
        />
      ) : (
        <Icon
          as={BiMoon}
          cursor="pointer"
          mr={2}
          w={6}
          h={6}
          color="gray.600"
          onClick={toggleColorMode}
        />
      )}
    </>
  );
};
