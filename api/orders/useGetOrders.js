import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../axios";
export const ORDERS_QUERY_KEY = "orders";

export default function useGetOrders() {
  const fetchOrders = async () => {
    const { data, status } = await axiosPrivate.get(
      "shipper/order/get-my-orders"
    );

    if (status !== 200) throw new Error("Không thể lý đơn hàng");

    return data ?? [];
  };

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ORDERS_QUERY_KEY],
    queryFn: fetchOrders,
  });

  return { orders, error, isLoading };
}
