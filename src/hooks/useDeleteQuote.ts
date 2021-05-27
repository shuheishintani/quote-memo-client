import { useCallback, useState } from "react";
import { useAxios } from "./useAxios";

export const useDeleteQuote = () => {
  const { customAxios } = useAxios();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteQuote = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);

    const response = await await customAxios.delete(
      process.env.NEXT_PUBLIC_API_BASE_URL + `/api/quotes/${id}`
    );
    setLoading(false);
    if (response.status === 200) {
      return true;
    }
    return false;
  }, []);
  return { deleteQuote, loading };
};
