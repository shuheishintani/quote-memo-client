import { useAxios } from "./useAxios";

type BookForExport = {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
};

type QuoteForExport = {
  id: number;
  text: string;
  page: number;
  book: BookForExport;
  tags: string[];
};

export const useGetPrivateQuotesForExport = () => {
  const { customAxios } = useAxios();

  const getPrivateQuotesForExport = async (): Promise<QuoteForExport[]> => {
    try {
      const response = await customAxios.get(`/api/quotes/for_export`);
      return response.data;
    } catch (e) {
      throw new Error("Failed to fetch quotes");
    }
  };

  return { getPrivateQuotesForExport };
};
