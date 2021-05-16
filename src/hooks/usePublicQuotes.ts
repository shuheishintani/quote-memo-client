import { useState } from "react";
import { Quote } from "../type/Quote";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const usePublicQuotes = (tags: string[]) => {
  const [publicQuotes, setPublicQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { customAxios } = useAxios();

  useEffectAsync(async () => {
    const query = tags.join(",");
    const url =
      tags.length > 0
        ? `/api/public/quotes?tags=${query}`
        : "api/public/quotes";
    setLoading(true);
    await sleep(1000);
    const response = await customAxios.get(url);
    // console.log(response.data);
    if (response?.status === 200) {
      setPublicQuotes(response.data);
    }
    setLoading(false);
  }, [tags]);

  return { publicQuotes, loading };
};
