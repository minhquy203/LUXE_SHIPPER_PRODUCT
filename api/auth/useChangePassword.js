import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";

export default function useChangePassword() {
  const fetchChangePassword = async (body) => {
    const { data } = await axiosPrivate.post("auth/change-password", body);

    return data;
  };

  const { mutateAsync: handleChangePassword } = useMutation({
    mutationFn: fetchChangePassword,
  });

  return { handleChangePassword };
}
