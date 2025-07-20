import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";

export default function useUpdateProfile() {
  const fetchUpdateProfile = async (body) => {
    const { data, status } = await axiosPrivate.put("auth/update", body);

    if (status !== 200) throw new Error("Không thể cập nhật trạng thái");

    return data;
  };

  const { mutateAsync: handleUpdateProfile } = useMutation({
    mutationFn: fetchUpdateProfile,
  });

  return { handleUpdateProfile };
}
