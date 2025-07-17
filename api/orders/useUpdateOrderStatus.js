import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";

export default function useUpdateOrderStatus() {
  const fetchUpdateOrderStatus = async (id) => {
    const { data, status } = await axiosPrivate.put(
      "shipper/order/update-status/" + id
    );

    if (status !== 200) throw new Error("Không thể cập nhật trạng thái");

    return data;
  };

  const { mutateAsync: handleUpdateOrderStatus } = useMutation({
    mutationFn: fetchUpdateOrderStatus,
  });

  return { handleUpdateOrderStatus };
}
