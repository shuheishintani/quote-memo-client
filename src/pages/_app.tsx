import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { QuotesContext } from "../context/QuotesContext";
import theme from "../theme";
import { Quote } from "../type/Quote";

function MyApp({ Component, pageProps }: AppProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const providerValue = useMemo(
    () => ({ quotes, setQuotes }),
    [quotes, setQuotes]
  );

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QuotesContext.Provider value={providerValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QuotesContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
