"use client";

import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useChangePassword } from "@/api/auth";
import { useEffect, useState } from "react";

// Schema xác thực với Yup
const schema = yup.object().shape({
  old_password: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  new_password: yup
    .string()
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Xác nhận mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export default function ChangePasswordPage() {
  const { handleChangePassword } = useChangePassword();
  const [isLoading, setIsLoading] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
     const user = JSON.parse(localStorage.getItem("user"));

    handleChangePassword(
      {
        mat_khau: data.old_password,
        mat_khau_moi: data.new_password,
        xac_nhan_mat_khau_moi: data.confirm_password,
        userId: user?._id
      },
      {
        onSuccess: () => {
          alert("Đổi mật khẩu thành công!");
          setChangePasswordError("");
          reset();
        },
        onError: (data) => {
            if(!data?.response?.data?.message)
                setChangePasswordError("Lỗi, vui lòng thử lại sau!");
            else
                setChangePasswordError(data.response.data.message);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (changePasswordError) {
      alert(changePasswordError);
      setChangePasswordError("");
    }
  }, [changePasswordError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 max-w-full mx-auto flex flex-col gap-6 bg-white mt-20 py-4"
    >
      <div className="px-6">
        <h1 className="text-xl font-bold text-black mb-1">Đổi mật khẩu</h1>
        <p>Thay đổi mật khẩu tài khoản của bạn</p>
      </div>
      <hr />
      <div className="pt-6 px-6 grid gap-4">
        {/* Mật khẩu hiện tại */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-[#364153]">Mật khẩu hiện tại</label>
          <input
            type="password"
            {...register("old_password")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.old_password?.message}</p>
        </div>

        {/* Mật khẩu mới */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-[#364153]">Mật khẩu mới</label>
          <input
            type="password"
            {...register("new_password")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.new_password?.message}</p>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-[#364153]">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            {...register("confirm_password")}
            className="border px-4 py-2 w-full text-sm"
          />
          <p className="text-red-500 text-sm">{errors.confirm_password?.message}</p>
        </div>
        {/* Nút Lưu */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1A73E8] text-white text-center py-2 px-4 cursor-pointer rounded-md w-fit hover:bg-[#1662c4] transition"
          >
            {isLoading ? "Đang lưu..." : "Đổi mật khẩu"}
          </button>
        </div>
      </div>
    </form>
  );
}
