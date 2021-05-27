import { useState } from "react";
import { Quote } from "../type/Quote";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useGetPrivateQuoteById = (id: string | undefined | string[]) => {
  const { customAxios } = useAxios();
  const [fetching, setFetching] = useState<boolean>(false);
  const [quote, setQuote] = useState<Quote>();

  useEffectAsync(async () => {
    if (typeof id !== "string") {
      return;
    }
    setFetching(true);
    const response = await customAxios(`/api/quotes/${id}`);
    setFetching(false);
    if (response.status === 200) {
      setQuote(response.data);
    }
  }, [id]);

  return { quote, fetching };
};
