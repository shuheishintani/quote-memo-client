import { Book } from "../type/Book";
import { useAxios } from "./useAxios";

export const useFetchBooks = () => {
  const { customAxios } = useAxios();

  type FetchBooksInput = {
    title: string;
    author: string;
    page: string;
  };

  const fetchBooks = async (
    fetchBooksInput: FetchBooksInput
  ): Promise<Book[]> => {
    const { title, author, page } = fetchBooksInput;
    let url = `/api/public/external_books`;

    if (title && author) {
      url += `?title=${title}&author=${author}&page=${page}`;
    } else if (title) {
      url += `?title=${title}&page=${page}`;
    } else if (author) {
      url += `?author=${author}&page=${page}`;
    } else {
      throw new Error("Invalid input");
    }

    try {
      const response = await customAxios.get(url);
      return response.data;
    } catch (e) {
      throw new Error("Failed books data");
    }
  };

  return { fetchBooks };
};
