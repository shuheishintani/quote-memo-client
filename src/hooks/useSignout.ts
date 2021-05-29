import firebase from "firebase/app";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useAxios } from "./useAxios";

export const useSignout: () => {
  signout: () => Promise<void>;
} = () => {
  const { customAxios } = useAxios();
  const router = useRouter();

  const signout = useCallback(async () => {
    const response = await customAxios.post("/api/auth/logout");
    if (response.status === 200) {
      await firebase.auth().signOut();
      router.push("/");
    }
  }, []);

  return { signout };
};
