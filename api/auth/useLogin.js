import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "../axios";

export default function useLogin() {
  const fetchLogin = async (body) => {
    const { data } = await axiosPublic.post("auth/login", body);

    return data;
  };

  const { mutateAsync: handleLogin } = useMutation({
    mutationFn: fetchLogin,
  });

  return { handleLogin };
}
