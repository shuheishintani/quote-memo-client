import { useRef, useState } from "react";
import { Quote } from "../type/Quote";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const usePublicQuotes = () => {
  const [publicQuotes, setPublicQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [nextFetching, setNextFetching] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const { customAxios } = useAxios();

  //初回マウント時とaddedTagsが変化した時のみ発火
  useEffectAsync(async () => {
    const query = addedTags.join(",");
    const url =
      addedTags.length > 0
        ? `/api/quotes?page=1&tags=${query}`
        : `api/quotes?page=1`;
    setFetching(true);
    await sleep(1000);
    const response = await customAxios.get(url);
    if (response?.status === 200) {
      if (response.data.length < 10) {
        setNext(false);
      } else {
        setNext(true);
      }
      setPublicQuotes(response.data);
    }
    setFetching(false);
  }, [addedTags]);

  //currentPageが2以降に変化した時のみ発火
  useEffectAsync(async () => {
    if (currentPage !== 1) {
      const query = addedTags.join(",");
      const url =
        addedTags.length > 0
          ? `/api/quotes?page=${currentPage}&tags=${query}`
          : `api/quotes?page=${currentPage}`;
      setNextFetching(true);
      await sleep(1000);
      const response = await customAxios.get(url);
      if (response?.status === 200) {
        if (response.data.length < 10) {
          setNext(false);
        } else {
          setNext(true);
        }
        setPublicQuotes((prev) => [...prev, ...response.data]);
      }
      setNextFetching(false);
    }
  }, [currentPage]);

  return {
    publicQuotes,
    fetching,
    nextFetching,
    next,
    setCurrentPage,
    addedTags,
    setAddedTags,
  };
};
