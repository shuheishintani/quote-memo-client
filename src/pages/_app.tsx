import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { PageContext } from "../context/PageContext";
import { QuotesContext } from "../context/QuotesContext";
import theme from "../theme";
import { Quote } from "../type/Quote";

function MyApp({ Component, pageProps }: AppProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const providerQuotesValue = useMemo(
    () => ({ quotes, setQuotes }),
    [quotes, setQuotes]
  );

  const providerPageValue = useMemo(
    () => ({ currentPage, setCurrentPage }),
    [currentPage, setCurrentPage]
  );

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QuotesContext.Provider value={providerQuotesValue}>
        <PageContext.Provider value={providerPageValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PageContext.Provider>
      </QuotesContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
