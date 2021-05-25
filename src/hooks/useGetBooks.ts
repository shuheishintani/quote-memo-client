import { Book } from "../type/Book";
import { useAxios } from "./useAxios";

export const useGetBooks = () => {
  const { customAxios } = useAxios();

  const getBooks = async (keyword: string): Promise<Book[]> => {
    try {
      const response = await customAxios.get(`/api/books?keyword=${keyword}`);
      return response.data;
    } catch (e) {
      throw new Error("Failed to fetch books");
    }
  };

  return { getBooks };
};
