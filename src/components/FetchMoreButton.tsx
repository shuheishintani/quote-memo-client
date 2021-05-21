import { Box, Spinner, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  nextFetching: boolean;
}

export const FetchMoreButton: React.VFC<Props> = ({
  setCurrentPage,
  nextFetching,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box align="center">
      {nextFetching ? (
        <Spinner />
      ) : (
        <Box
          borderRadius="md"
          cursor="pointer"
          maxWidth="400px"
          mx="auto"
          bg={isDark ? "#1B212C" : "white"}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          mb={24}
          align="center"
        >
          <Text fontSize="sm" align="center" py={2}>
            ＋ さらに読み込む
          </Text>
        </Box>
      )}
    </Box>
  );
};
