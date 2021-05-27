import { useCallback, useState } from "react";
import { QuoteInput } from "../dto/QuoteInput";
import { useAxios } from "./useAxios";

export const usePostQuote = () => {
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);

  const postQuote = useCallback(
    async (postQuoteInput: QuoteInput): Promise<boolean> => {
      setProcessing(true);

      const response = await customAxios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/quotes",
        postQuoteInput
      );
      setProcessing(false);
      if (response?.status === 201) {
        return true;
      }
      return false;
    },
    []
  );
  return { postQuote, processing };
};
