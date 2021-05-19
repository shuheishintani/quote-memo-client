import { Flex, useColorMode, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      w="100%"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
      minHeight="100vh"
      mx="auto"
      px={5}
    />
  );
};
