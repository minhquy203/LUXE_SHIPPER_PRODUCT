"use client";

import { useMe, useUpdateProfile } from "@/api/account";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

// 1. Định nghĩa schema validation với Yup
const schema = yup.object().shape({
  ho_ten: yup.string().required("Họ tên là bắt buộc"),
  dia_chi: yup.string().required("Địa chỉ là bắt buộc"),
  so_dien_thoai: yup
    .string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  ngay_thang_nam_sinh: yup.date().typeError("Ngày sinh không hợp lệ").required("Vui lòng chọn ngày sinh"),
  gioi_tinh: yup.string().oneOf(["nam", "nữ", "khác"]),
});

export default function Page() {
  const { user } = useMe();
  const {handleUpdateProfile} = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 2. Gán giá trị mặc định từ user vào form
  useEffect(() => {
    if (user) {
      reset({
        ho_ten: user.ho_ten || "",
        email: user.email || "",
        dia_chi: user.dia_chi || "",
        so_dien_thoai: user.so_dien_thoai || "",
        ngay_thang_nam_sinh: user.ngay_thang_nam_sinh?.slice(0, 10) || "",
        gioi_tinh: user.gioi_tinh || "khác",
      });
    }
  }, [user, reset]);

  const onSubmit = (body) => {
    handleUpdateProfile(body, {
      onSuccess: () => {
        alert("Cập nhật thành công!");
      },
      onError: (data) => {
        alert(data.message);
      }
    });
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 max-w-full mx-auto flex flex-col gap-6 bg-white mt-20 py-4 h-[600px] overflow-y-auto"
    >
      <div className="px-6">
        <h1 className="text-xl font-bold text-black mb-1">Thông tin cá nhân</h1>
        <p>Thay đổi thông tin cá nhân của bạn</p>
      </div>
      <hr />
      <div className="pt-6 px-6 grid md:grid-cols-2 gap-4">
        {/* Họ tên */}
        <div className="space-y-1">
          <label className="text-sm text-[#364153] font-bold">Họ & Tên</label>
          <input
            type="text"
            {...register("ho_ten")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.ho_ten?.message}</p>
        </div>

        {/* Email (không được sửa) */}
        <div className="space-y-1">
          <label className="text-sm text-[#364153] font-bold">Email</label>
          <input
            type="email"
            disabled
            className="border px-4 py-2 w-full text-sm bg-gray-100"
            value={user.email}
          />
        </div>

        {/* Địa chỉ */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Địa chỉ cư trú</label>
          <input
            type="text"
            {...register("dia_chi")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.dia_chi?.message}</p>
        </div>

        {/* Số điện thoại */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Số điện thoại</label>
          <input
            type="text"
            {...register("so_dien_thoai")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.so_dien_thoai?.message}</p>
        </div>

        {/* Ngày sinh */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Ngày sinh</label>
          <input
            type="date"
            {...register("ngay_thang_nam_sinh")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.ngay_thang_nam_sinh?.message}</p>
        </div>

        {/* Giới tính */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-[#364153] font-bold">Giới Tính</label>
          <div className="flex items-center gap-4">
            {["nam", "nữ", "khác"].map((gender) => (
              <label key={gender} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={gender}
                  className="capitalize"
                  {...register("gioi_tinh")}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Nút Lưu */}
        <div className="space-y-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-[#EBFFEC] text-[#34A853] text-center py-2 px-4 cursor-pointer rounded-md w-fit"
          >
            Lưu
          </button>
        </div>
      </div>
    </form>
  );
}
