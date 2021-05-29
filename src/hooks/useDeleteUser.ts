import { useState } from "react";
import { useAuth } from "./useAuth";
import { useAxios } from "./useAxios";
import { useSignout } from "./useSignout";

export const useDeleteUser = () => {
  const { user } = useAuth();
  const { customAxios } = useAxios();
  const [processing, setProcessing] = useState<boolean>(false);
  const { signout } = useSignout();

  const deleteUser = async (): Promise<boolean> => {
    if (!user) {
      return false;
    }
    setProcessing(true);

    const response = await customAxios.delete("/api/users");
    if (response?.status === 200) {
      signout();
      setProcessing(false);
      return true;
    }
    return false;
  };

  return { deleteUser, processing };
};
