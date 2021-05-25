import { Book } from "../type/Book";
import { useAxios } from "./useAxios";

// type QuoteForExport struct {
// 	ID   int           `gorm:"primary_key" json:"id"`
// 	Text string        `json:"text"`
// 	Page int           `json:"page"`
// 	Book BookForExport `json:"book"`
// 	Tags []string      `json:"tags"`
// }

// type BookForExport struct {
// 	ISBN      string `json:"isbn"`
// 	Title     string `json:"title"`
// 	Author    string `json:"author"`
// 	Publisher string `json:"publisher"`
// }

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
