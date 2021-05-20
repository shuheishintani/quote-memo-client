import firebase from "firebase";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { auth } from "../config/firebase/client";
import { useAxios } from "./useAxios";

export const useSignin: () => {
  signin: () => Promise<void>;
} = () => {
  const { customAxios } = useAxios();
  const router = useRouter();

  const signin = useCallback(async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters({ lang: "ja" });
    const userInfo: firebase.auth.UserCredential = await auth.signInWithPopup(
      provider
    );
    userInfo.user?.getIdToken().then((token: string) => {
      window.localStorage.setItem("token", token);
      console.log(userInfo.user);
      const profile = userInfo.user?.providerData[0];
      const userInput = {
        id: userInfo.user?.uid,
        username: profile?.displayName,
        profile_image_url: profile?.photoURL,
        provider: profile?.providerId,
      };
      customAxios.post("/api/users", userInput);
    });
    router.push("/private");
  }, []);

  return { signin };
};
