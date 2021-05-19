import { useState } from "react";
import { User } from "../type/User";
import { sleep } from "../util/sleep";
import { useAxios } from "./useAxios";
import { useEffectAsync } from "./useEffectAsync";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { customAxios } = useAxios();

  useEffectAsync(async () => {
    setLoading(true);
    await sleep(1000);
    const response = await customAxios.get("/api/users/me");
    if (response?.status === 200) {
      setUser(response.data);
    }
    setLoading(false);
  }, []);

  return { user, loading };
};
