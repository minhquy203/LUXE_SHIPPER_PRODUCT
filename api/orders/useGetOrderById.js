import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";

export const ORDERS_BY_ID_QUERY_KEY = "order-by-id";
export default function useGetOrderById(id) {
  const fetchOrderById = async () => {
    const { data, status } = await axiosPrivate.get(
      "shipper/order/get-my-order/" + id
    );

    if (status !== 200) throw new Error("Không thể lý đơn hàng");

    return data;
  };

  const {
    data: order,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ORDERS_BY_ID_QUERY_KEY, id],
    queryFn: fetchOrderById,
  });

  return { order, error, isLoading };
}
