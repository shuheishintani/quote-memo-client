import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";

export const Footer: React.VFC = () => (
  <Box p={4} mb={5} align="center" mx="auto" w="100%">
    <Divider mb={9} />
    <Text color="gray.500" fontSize="sm">
      &copy; QuoteMemo 2021
    </Text>
  </Box>
);
