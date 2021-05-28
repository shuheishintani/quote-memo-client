import { useRef, useState } from "react";
import { Quote } from "../type/Quote";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useQuotes = (tags: string[]) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [nextFetching, setNextFetching] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { customAxios } = useAxios();

  useEffectAsync(async () => {
    let unmounted = false;

    const query = tags.join(",");
    const url =
      tags.length > 0
        ? `/api/quotes/me?page=1&tags=${query}`
        : `api/quotes/me?page=1`;
    setFetching(true);

    const response = await customAxios.get(url);
    if (!unmounted) {
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

    return () => {
      unmounted = true;
    };
  }, [tags]);

  useEffectAsync(async () => {
    let unmounted = false;

    if (currentPage !== 1) {
      const query = tags.join(",");
      const url =
        tags.length > 0
          ? `/api/quotes/me?page=${currentPage}&tags=${query}`
          : `api/quotes/me?page=${currentPage}`;
      setNextFetching(true);

      const response = await customAxios.get(url);
      if (!unmounted) {
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
    }
    return () => {
      unmounted = true;
    };
  }, [currentPage]);

  return { quotes, setQuotes, setCurrentPage, fetching, nextFetching, next };
};
