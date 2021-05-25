import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase } from "../config/firebase/client";

export const useAuth: () => {
  user?: firebase.User | null;
  loading: boolean;
  error?: firebase.auth.Error;
} = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  console.log(user, loading);

  useEffect(() => {
    if (!user && !loading && router.pathname !== "index") {
      router.push("/");
    }
  }, [user, loading]);

  return { user, loading, error };
};
