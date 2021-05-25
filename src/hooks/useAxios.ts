import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

export const useAxios = () => {
  const router = useRouter();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse<any>) => response;
  const onError = (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        router.push("/");
        return;
    }
  };
  instance.interceptors.response.use(onSuccess, onError);

  return { customAxios: instance };
};
