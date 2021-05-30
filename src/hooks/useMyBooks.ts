import { useState } from "react";
import { Book } from "../type/Book";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useMyBooks = () => {
  const { customAxios } = useAxios();
  const [registeredBooks, setRegisteredBooks] = useState<Book[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffectAsync(async () => {
    let unmounted = false;
    setFetching(true);
    const response = await customAxios.get("/api/users/me/books");
    setFetching(false);
    if (!unmounted) {
      if (response.status === 200) {
        setRegisteredBooks(response.data);
      }
    }
    return () => {
      unmounted = true;
    };
  }, []);

  return { registeredBooks, fetching };
};
