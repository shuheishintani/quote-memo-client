import { useCallback, useContext, useState } from "react";
import { QuotesContext } from "../context/QuotesContext";
import { useAxios } from "./useAxios";

export const useDeleteQuote = () => {
  const { customAxios } = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const { setQuotes } = useContext(QuotesContext);

  const deleteQuote = useCallback(async (id: number) => {
    setLoading(true);

    const response = await customAxios.delete(
      process.env.NEXT_PUBLIC_API_BASE_URL + `/api/quotes/${id}`
    );
    setLoading(false);
    if (response?.status === 200) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    }
  }, []);
  return { deleteQuote, loading };
};
