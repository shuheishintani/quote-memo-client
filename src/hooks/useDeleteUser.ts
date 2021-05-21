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
    await user.delete();
    setProcessing(true);
    await sleep(1000);
    const response = await customAxios.delete("/api/users");
    setProcessing(false);
    if (response?.status === 200) {
      return true;
    }
    return false;
  };

  return { deleteUser, processing };
};
