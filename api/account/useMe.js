import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";

export const ME_QUERY_KEY = "me";

export default function useMe() {
  const fetchMe = async () => {
    const { data, status } = await axiosPrivate.get("/auth/me");

    if (status !== 200) throw new Error("Không thể lý người dùng");

    return data.user;
  };

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ME_QUERY_KEY],
    queryFn: fetchMe,
  });

  return { user, error, isLoading };
}
