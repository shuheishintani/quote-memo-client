import { useCallback, useContext, useState } from "react";
import { QuotesContext } from "../context/QuotesContext";
import { QuoteInput } from "../dto/QuoteInput";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";

export const usePostQuote = () => {
  console.log("usePostQuote");
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);
  const { setQuotes } = useContext(QuotesContext);

  const postQuote = useCallback(
    async (postQuoteInput: QuoteInput): Promise<boolean> => {
      setProcessing(true);
      await sleep(1000);
      const response = await customAxios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/quotes",
        postQuoteInput
      );
      setProcessing(false);
      if (response?.status === 201) {
        setQuotes((prev) => [...prev, response.data]);
        return true;
      }
      return false;
    },
    []
  );
  return { postQuote, processing };
};
