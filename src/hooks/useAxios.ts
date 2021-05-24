import axios, { AxiosError, AxiosResponse } from "axios";
import { useSignout } from "./useSignout";

export const useAxios = () => {
  const { signout } = useSignout();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });

  // instance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // config.headers = Object.assign(
  //   { Authorization: `Bearer ${token}` },
  //   config.headers
  // );
  // return config;
  // });

  const onSuccess = (response: AxiosResponse<any>) => response;
  const onError = (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        signout();
        return;
    }
  };
  instance.interceptors.response.use(onSuccess, onError);

  return { customAxios: instance };
};
