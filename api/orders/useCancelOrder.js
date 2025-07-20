import { axiosPrivate } from "../axios";
import { useMutation } from "@tanstack/react-query";

export default function useCancelOrder() {
  const fetchCancelOrder = async (id) => {
    const { data, status } = await axiosPrivate.put(
      "shipper/order/cancel-order/" + id
    );

    if (status !== 200) throw new Error("Không thể húp đơn hàng");

    return data;
  };

  const { mutateAsync: handleCancelOrder } = useMutation({
    mutationFn: fetchCancelOrder,
  });

  return { handleCancelOrder };
}
