import { useState } from "react";
import { Quote } from "../type/Quote";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useFavoriteQuotes = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { customAxios } = useAxios();

  useEffectAsync(async () => {
    setLoading(true);
    const response = await customAxios.get("/api/quotes/favorite");
    if (response?.status === 200) {
      setFavoriteQuotes(response.data);
    }
    setLoading(false);
  }, []);

  return { favoriteQuotes, loading };
};
