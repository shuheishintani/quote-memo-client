import { useState } from "react";
import { sleep } from "../util/sleep";
import { useAuth } from "./useAuth";
import { useAxios } from "./useAxios";

export const useDeleteUser = () => {
  const { user } = useAuth();
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);

  const deleteUser = async (): Promise<boolean> => {
    if (!user) {
      return false;
    }
    setProcessing(true);
    await sleep(1000);
    const response = await customAxios.delete("/api/users");
    await customAxios.post("/api/auth/logout");

    setProcessing(false);
    if (response?.status === 200) {
      await user.delete();
      return true;
    }
    return false;
  };

  return { deleteUser, processing };
};
