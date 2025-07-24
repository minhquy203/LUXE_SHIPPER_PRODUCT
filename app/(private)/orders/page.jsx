"use client";
import Link from "next/link";
import {  useQueryClient } from "@tanstack/react-query";
import { useUpdateOrderStatus, useGetOrdersToday  } from "@/api/orders";
import { STATUS_TRANSITIONS } from "@/constants/orders";
import { ORDERS_TODAY_QUERY_KEY } from "@/api/orders/useGetOrdersToday";

export default function Home() {
  const queryClient = useQueryClient();


  const {orders} = useGetOrdersToday();  

  const {handleUpdateOrderStatus} = useUpdateOrderStatus();

  const handleUpdateStatus = async (id) => {
    handleUpdateOrderStatus(id, {
      onSuccess: () => {
        queryClient.invalidateQueries([ORDERS_TODAY_QUERY_KEY]);
        alert("Cập nhật trạng thái Thành Công");
      }, 
      onError: () => {
        alert("Lỗi khi cập nhật trạng thái");
      }
    });
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-medium">Đơn Hàng</h2>
          
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Mã Đơn Hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Khách Hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Ngày Tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Ngày Cập Nhật
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Số Tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Hình Thức Thanh Toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.ma_don_hang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order?.id_customer?.ho_ten || "Ẩn danh"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.updated_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.tong_tien.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td className="px-6 py-4 font-bold whitespace-nowrap">
                    {order.phuong_thuc_thanh_toan === "COD" ? "Tiền mặt" : "VNPay"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 w-[200px]">
                      <span
                        className={`px-2 py-2 text-xs rounded-md text-center min-w-[120px] inline-block order-${order?.trang_thai_don_hang?.toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/đ/g, "d")
                          .replace(/\s+/g, "_")}`}
                      >
                        {order.trang_thai_don_hang === "Shipper đã nhận hàng" ? 'Nhận Đơn' : order.trang_thai_don_hang}
                      </span>
                   
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 w-[200px]">
                  <span
                        className={`px-2 py-2 text-xs rounded-md text-center min-w-[120px] inline-block cursor-pointer order-${STATUS_TRANSITIONS[order.trang_thai_don_hang]?.toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/đ/g, "d")
                          .replace(/\s+/g, "_")}`}
                        onClick={() => handleUpdateStatus(order._id)}
                      >
                        {STATUS_TRANSITIONS[order.trang_thai_don_hang]}
                      </span>
                   
                    <Link href={`/orders/${order._id}`}
                      className="text-black/50 bg-[#FCF4F4] rounded-full hover:underline p-1.5"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </main>
  );
}
