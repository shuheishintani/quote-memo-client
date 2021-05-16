import { useContext, useState } from "react";
import { QuotesContext } from "../context/QuotesContext";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useQuotes = (tags: string[]) => {
  console.log("useQuotes");
  const { quotes, setQuotes } = useContext(QuotesContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { customAxios } = useAxios();

  useEffectAsync(async () => {
    const query = tags.join(",");
    const url = tags.length > 0 ? `/api/quotes?tags=${query}` : "api/quotes";
    setLoading(true);
    await sleep(1000);
    const response = await customAxios.get(url);
    if (response?.status === 200) {
      setQuotes(response.data);
    }
    setLoading(false);
  }, [tags]);

  return { quotes, loading };
};
