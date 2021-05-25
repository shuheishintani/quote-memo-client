import firebase from "firebase/app";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { QuotesContext } from "../context/QuotesContext";
import { useAxios } from "./useAxios";

export const useSignout: () => {
  signout: () => Promise<void>;
} = () => {
  const { customAxios } = useAxios();
  const router = useRouter();
  const { setQuotes } = useContext(QuotesContext);

  const signout = useCallback(async () => {
    const response = await customAxios.post("/api/auth/logout");
    if (response.status === 200) {
      await firebase.auth().signOut();
      setQuotes([]);
      router.push("/");
    }
  }, []);

  return { signout };
};
