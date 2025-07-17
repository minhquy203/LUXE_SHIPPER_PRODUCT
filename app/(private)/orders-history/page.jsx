"use client";
import { useGetOrders } from "@/api/orders";
import { useEffect, useState } from "react";
import {  StatsItem } from "./_components";
import Link from "next/link";

export default function Home() {
  const {orders} = useGetOrders();  
  const [stats, setStats] = useState([]);

  useEffect(() => {
        const tongDon = orders?.length;
        const dangGiao = orders?.filter((o) => o.trang_thai_don_hang === "Đang giao").length;
        const daNhan = orders?.filter(
          (o) => o.trang_thai_don_hang === "Shipper đã nhận hàng" || o.trang_thai_don_hang === "Đang giao"
        ).length;
        
        const daGiao = orders?.filter((o) => o.trang_thai_don_hang === "Giao hàng thành công")
          .reduce((sum, o) => sum + (o.tong_tien || 0), 0);

        setStats([
          {
            label: "Tổng Đơn Hàng",
            value: tongDon?.toString(),
            icon: "fas fa-receipt",
            color: "bg-green-100 text-green-500",
          },
          {
            label: "Đơn hàng đã nhận",
            value: daNhan?.toString(),
            icon: "fa-regular fa-square-plus",
            color: "bg-blue-100 text-blue-500",
          },
          {
            label: "Đơn hàng đang giao",
            value: dangGiao?.toString(),
            icon: "fas fa-spinner",
            color: "bg-yellow-100 text-yellow-500",
          },
          {
            label: "Đã giao",
            value: `₫${daGiao?.toLocaleString("vi-VN") ?? ''}`,
            icon: "fas fa-dollar-sign",
            color: "bg-purple-100 text-purple-500",
          },
        ]);

  }, [orders]);

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon, color, percentage }) => (
          <StatsItem
            key={label}
            label={label}
            value={value}
            icon={icon}
            color={color}
            percentage={percentage}
          />
        ))}
      </div>

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
                  Trang Thái
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
                        className={`px-2 py-2 text-xs rounded-md text-center min-w-[120px] inline-block order-${order.trang_thai_don_hang?.toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/đ/g, "d")
                          .replace(/\s+/g, "_")}`}
                      >
                        {order.trang_thai_don_hang === "Shipper đã nhận hàng" ? 'Nhận Đơn' : order.trang_thai_don_hang}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2 w-[200px]">
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
