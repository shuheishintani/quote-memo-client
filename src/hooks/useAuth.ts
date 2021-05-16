import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase } from "../config/firebase/client";

export const useAuth: () => {
  user?: firebase.User | null;
  loading: boolean;
  error?: firebase.auth.Error;
} = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
};
