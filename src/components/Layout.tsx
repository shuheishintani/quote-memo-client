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
      <Container zIndex={0}>
        <Box mt={8} w="100%" maxWidth="800px" minHeight="90vh">
          {children}
        </Box>
      </Container>
      <Footer />
    </>
  );
};
