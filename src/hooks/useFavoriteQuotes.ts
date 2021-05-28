import { useState } from "react";
import { Quote } from "../type/Quote";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useFavoriteQuotes = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const { customAxios } = useAxios();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextFetching, setNextFetching] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  useEffectAsync(async () => {
    let unmounted = false;
    setFetching(true);
    const response = await customAxios.get("/api/quotes/my_favorite?page=1");
    if (!unmounted) {
      if (response?.status === 200) {
        if (response.data.length === 10) {
          setNext(true);
        } else {
          setNext(false);
        }
        setFavoriteQuotes(response.data);
      }
      setFetching(false);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffectAsync(async () => {
    let unmounted = false;

    if (currentPage !== 1) {
      setNextFetching(true);

      const response = await customAxios.get(
        `/api/quotes/my_favorite?page=${currentPage}`
      );
      if (!unmounted) {
        if (response?.status === 200) {
          if (response.data.length === 10) {
            setNext(true);
          } else {
            setNext(false);
          }
          setFavoriteQuotes((prev) => [...prev, ...response.data]);
        }
        setNextFetching(false);
      }
    }
    return () => {
      unmounted = true;
    };
  }, [currentPage]);

  return { favoriteQuotes, setCurrentPage, fetching, nextFetching, next };
};
