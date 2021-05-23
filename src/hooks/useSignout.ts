import firebase from "firebase/app";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useSignout: () => {
  signout: () => Promise<void>;
} = () => {
  const router = useRouter();

  const signout = useCallback(async () => {
    await firebase.auth().signOut();
    router.push("/");
  }, []);

  return { signout };
};
