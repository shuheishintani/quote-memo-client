import { useCallback, useState } from "react";
import { useAxios } from "./useAxios";

export const useAddFavoriteQuote = () => {
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);

  const addFavoriteQuote = useCallback(async (id: number): Promise<boolean> => {
    setProcessing(true);
    const response = await customAxios.put(`/api/quotes/${id}/like`);
    setProcessing(false);
    if (response?.status === 200) {
      return true;
    }
    return false;
  }, []);
  return { addFavoriteQuote, processing };
};
