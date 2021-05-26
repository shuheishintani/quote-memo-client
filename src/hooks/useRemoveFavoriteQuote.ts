import { useCallback, useState } from "react";
import { useAxios } from "./useAxios";

export const useRemoveFavoriteQuote = () => {
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);

  const removeFavoriteQuote = useCallback(
    async (id: number): Promise<boolean> => {
      setProcessing(true);

      const response = await customAxios.put(`/api/quotes/${id}/unlike`);
      setProcessing(false);
      if (response?.status === 200) {
        return true;
      }
      return false;
    },
    []
  );
  return { removeFavoriteQuote, processing };
};
