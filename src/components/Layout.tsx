import { Box } from "@chakra-ui/react";
import React from "react";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container minHeight="100vh">
        <Box mt={8} mx="auto" w="100%" maxW="800px" minHeight="100vh">
          {children}
        </Box>
        <Footer />
      </Container>
    </>
  );
};
