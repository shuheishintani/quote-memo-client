import { useContext, useRef, useState } from "react";
import { PageContext } from "../context/PageContext";
import { QuotesContext } from "../context/QuotesContext";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useQuotes = (tags: string[]) => {
  const { quotes, setQuotes } = useContext(QuotesContext);
  const [fetching, setFetching] = useState<boolean>(false);
  const [nextFetching, setNextFetching] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const { customAxios } = useAxios();
  const isInitialMount = useRef(true);

  useEffectAsync(async () => {
    if (isInitialMount.current && quotes.length > 0) {
      return;
    }

    if (currentPage === 1) {
      const query = tags.join(",");
      const url =
        tags.length > 0
          ? `/api/quotes?page=${currentPage}&tags=${query}`
          : `api/quotes?page=${currentPage}`;
      setFetching(true);
      await sleep(1000);
      const response = await customAxios.get(url);
      if (response?.status === 200) {
        if (response.data.length === 10) {
          setNext(true);
        } else {
          setNext(false);
        }
        setQuotes(response.data);
      }
      setFetching(false);
    }
  }, [tags]);

  useEffectAsync(async () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (currentPage !== 1) {
      console.log(currentPage, "追加フェッチ");
      const query = tags.join(",");
      const url =
        tags.length > 0
          ? `/api/quotes?page=${currentPage}&tags=${query}`
          : `api/quotes?page=${currentPage}`;
      setNextFetching(true);
      await sleep(1000);
      const response = await customAxios.get(url);
      if (response?.status === 200) {
        if (response.data.length === 10) {
          setNext(true);
        } else {
          setNext(false);
        }
        setQuotes((prev) => [...prev, ...response.data]);
      }
      setNextFetching(false);
    }
  }, [currentPage]);

  return { quotes, setCurrentPage, fetching, nextFetching, next };
};
