import { useState } from "react";
import { Quote } from "../type/Quote";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const usePublicQuotes = (tags: string[], page: number) => {
  const [publicQuotes, setPublicQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [nextFetching, setNextFetching] = useState<boolean>(false);
  const { customAxios } = useAxios();

  useEffectAsync(async () => {
    if (page === 1) {
      const query = tags.join(",");
      const url =
        tags.length > 0
          ? `/api/public/quotes?page=${page}&tags=${query}`
          : `api/public/quotes?page=${page}`;
      setFetching(true);
      await sleep(1000);
      const response = await customAxios.get(url);
      if (response?.status === 200) {
        setPublicQuotes(response.data);
      }
      setFetching(false);
    }
  }, [tags]);

  useEffectAsync(async () => {
    if (page !== 1) {
      const query = tags.join(",");
      const url =
        tags.length > 0
          ? `/api/public/quotes?page=${page}&tags=${query}`
          : `api/public/quotes?page=${page}`;
      setNextFetching(true);
      await sleep(1000);
      const response = await customAxios.get(url);
      if (response?.status === 200) {
        setPublicQuotes((prev) => [...prev, ...response.data]);
      }
      setNextFetching(false);
    }
  }, [page]);

  return { publicQuotes, fetching, nextFetching };
};
