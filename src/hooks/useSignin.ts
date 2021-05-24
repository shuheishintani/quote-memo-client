import firebase from "firebase/app";
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
    const id_token = await userInfo.user?.getIdToken();
    const response = await customAxios.post("/api/auth/login", {
      id_token,
    });

    const profile = userInfo.user?.providerData[0];
    const userInput = {
      id: userInfo.user?.uid,
      username: profile?.displayName,
      profile_image_url: profile?.photoURL,
      provider: profile?.providerId,
    };
    await customAxios.post("/api/users", userInput);

    if (response.status === 200) {
      router.push("/private");
    }
  }, []);

  return { signin };
};
