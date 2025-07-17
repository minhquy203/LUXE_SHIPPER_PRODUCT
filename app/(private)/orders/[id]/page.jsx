'use client';
import {useParams} from "next/navigation";
import {useUpdateOrderStatus, useCancelOrder, useGetOrderById} from "@/api/orders";
import { ORDERS_BY_ID_QUERY_KEY } from "@/api/orders/useGetOrderById";
import {useQueryClient} from "@tanstack/react-query";
import { ALLOW_UPDATE_STATUS, STATUS_TRANSITIONS } from "@/constants/orders";

export default function Page() {
  const queryClient = useQueryClient();

    const {id} = useParams();

    const {order} = useGetOrderById(id);
    const {handleUpdateOrderStatus} = useUpdateOrderStatus();
    const {handleCancelOrder} = useCancelOrder();

    const handleChangeStatus = async (orderId) => {
       handleUpdateOrderStatus(orderId, {
         onSuccess: () => {
           queryClient.invalidateQueries([ORDERS_BY_ID_QUERY_KEY, orderId]);
           alert("Cập nhật trạng thái Thành Công");
         }, 
         onError: () => {
           alert("Lỗi khi cập nhật trạng thái");
         }
       })
    };

    const handleCancel = async (orderId) => {
      handleCancelOrder(orderId, {
        onSuccess: () => {
          queryClient.invalidateQueries([ORDERS_BY_ID_QUERY_KEY, orderId]);
          alert("Hủy đơn hàng");
        }, 
        onError: () => {
          alert("Lỗi khi hủy đơn hàng");
        }
      })
    };

  if (!order) return null;

  return (
    <div className="w-4/5 max-w-full mx-auto flex flex-col gap-6 bg-white mt-20 py-4">
      <div className="py-4 px-6 space-y-10">
        <h2 className="text-lg text-black font-bold">Chi Tiết Đơn Hàng</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-medium">Họ Và Tên</label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">{order?.id_customer?.ho_ten}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-medium">
              Số Điện Thoại
            </label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">{order.sdt}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-medium">
              Mã Đơn Hàng
            </label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">{order.ma_don_hang}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-sm text-black font-medium">Số Tiền</label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">{order.tong_tien}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-black font-medium">Địa Chỉ</label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">
                {order.dia_chi_giao_hang}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-black font-medium">
              Địa Chỉ Cụ Thể Cho Tài Xế
            </label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">Tầng 226, số nhà 26</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-black font-medium">
              Email Người Nhận
            </label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black">{order.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-medium">
              Hình Thức Thanh Toán
            </label>
            <div className="border px-4 py-2">
              <p className="text-sm text-black font-bold">
                {order.phuong_thuc_thanh_toan}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-medium">
              Trạng thái Đơn Hàng
            </label>
            <div>
            <span
                        className={`px-2 py-2 text-sm rounded-md text-center min-w-[120px] inline-block order-${order.trang_thai_don_hang?.toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/đ/g, "d")
                          .replace(/\s+/g, "_")}`}
                      >
                        {order.trang_thai_don_hang === "Shipper đã nhận hàng" ? 'Nhận Đơn' : order.trang_thai_don_hang}
                      </span>
            </div>
          </div>
          {ALLOW_UPDATE_STATUS.includes(order.trang_thai_don_hang) && (
            <div className="grid grid-cols-2 col-span-2 mt-6 gap-2 items-end">
              <div
                className="bg-[#EBFFEC] text-[#34A853] text-center py-2 px-4 cursor-pointer rounded-md"
                onClick={() => handleChangeStatus(order._id)}
              >
                {STATUS_TRANSITIONS[order.trang_thai_don_hang]}
              </div>
              <div
                className="bg-[#FFD3D3] text-[#EC0015] text-center py-2 px-4 cursor-pointer rounded-md"
                onClick={() => handleCancel(order._id)}
              >
                Hủy Đơn Hàng
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}