import { useCallback, useContext, useState } from "react";
import { QuotesContext } from "../context/QuotesContext";
import { QuoteInput } from "../dto/QuoteInput";
import { useAxios } from "./useAxios";

export const useUpdateQuote = () => {
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);
  const { setQuotes } = useContext(QuotesContext);

  const updateQuote = useCallback(
    async (updateQuoteInput: QuoteInput, id: number): Promise<boolean> => {
      setProcessing(true);

      const response = await customAxios.put(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/api/quotes/${id}`,
        updateQuoteInput
      );
      setProcessing(false);
      if (response?.status === 200) {
        setQuotes((prev) =>
          prev.map((quote) => {
            if (quote.id === id) {
              return response.data;
            } else {
              return quote;
            }
          })
        );
        return true;
      }
      return false;
    },
    []
  );
  return { updateQuote, processing };
};
