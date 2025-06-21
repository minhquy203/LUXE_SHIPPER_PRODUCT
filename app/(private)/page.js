'use client';

import { useEffect, useState } from 'react';
import Cookies from "js-cookie";

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {

      const userStr = Cookies.get("user");
      let token;
      if (userStr) {
        const user = JSON.parse(decodeURIComponent(userStr));
        token = user.access_token;
      }
      localStorage.setItem("token", token);

      if (!token) return;

      try {
        const res = await fetch('http://localhost:3000/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");

        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } catch (error) {
        console.error('Lỗi khi lấy user:', error.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="w-4/5 max-w-full mx-auto flex flex-col gap-6 bg-white mt-20 py-4">
      <div className="px-6">
        <h1 className="text-xl font-bold text-black mb-1">Thông tin cá nhân</h1>
        <p>Thay đổi thông tin cá nhân của bạn</p>
      </div>
      <hr />
      <div className="pt-6 px-6 grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-[#364153] font-bold">Họ & Tên</label>
          <input
            type="text"
            className="border px-4 py-2 w-full text-sm"
            defaultValue={user?.ho_ten || ""}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-[#364153] font-bold">Email</label>
          <input
            type="email"
            className="border px-4 py-2 w-full text-sm"
            defaultValue={user.email || ""}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Địa chỉ cư trú</label>
          <input
            type="text"
            className="border px-4 py-2 w-full text-sm"
            defaultValue={user.dia_chi || ""}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Số điện thoại</label>
          <input
            type="text"
            className="border px-4 py-2 w-full text-sm"
            defaultValue={user.so_dien_thoai || ""}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Ngày tháng năm sinh</label>
          <input
            type="date"
            className="border px-4 py-2 w-full text-sm"
            defaultValue={user.ngay_thang_nam_sinh?.slice(0, 10) || ""}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Giới Tính</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" defaultChecked={user.gioi_tinh === "male"} />
              Nam
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" defaultChecked={user.gioi_tinh === "female"} />
              Nữ
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" defaultChecked={user.gioi_tinh === "other"} />
              Khác
            </label>
          </div>
        </div>
        <div className="space-y-1 md:col-span-2 flex justify-end">
          <div className="bg-[#EBFFEC] text-[#34A853] text-center py-2 px-4 cursor-pointer rounded-md w-fit">
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
}
