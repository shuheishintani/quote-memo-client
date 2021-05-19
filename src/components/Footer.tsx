import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const Footer: React.VFC = () => (
  <Box p={10} align="center" mx="auto" w="100%">
    <Text color="gray.500" fontSize="sm" my="auto">
      &copy; QuoteMemo 2021
    </Text>
  </Box>
);
