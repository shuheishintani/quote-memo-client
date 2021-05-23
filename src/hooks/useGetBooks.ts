import { Book } from "../type/Book";
import { useAxios } from "./useAxios";

export const useGetBooks = () => {
  const { customAxios } = useAxios();

  const getBooks = async (keyword: string): Promise<Book[]> => {
    try {
      const response = await customAxios.get(
        `/api/public/books?keyword=${keyword}`
      );
      return response.data;
    } catch (e) {
      throw new Error("Failed books data");
    }
  };

  return { getBooks };
};
