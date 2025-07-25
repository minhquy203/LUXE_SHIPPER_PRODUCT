"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "@/api/auth";
import { useRouter } from "next/navigation";

// ✅ Yup validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  mat_khau: Yup.string().required("Vui lòng nhập mật khẩu"),
});

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Call your login API here with axiosPrivate, etc.
      handleLogin(data, {
        onSuccess: (data) => {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/");
        },
        onError: (data) => {
          setLoginError(data?.response?.data?.message);
        },
      });
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (loginError) {
      alert(loginError);
      setLoginError("");
    }
  }, [loginError]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-truck text-yellow-500 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đăng nhập Shipper
          </h2>
          <p className="text-gray-600 text-sm">
            Vui lòng đăng nhập để truy cập hệ thống giao hàng
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-envelope mr-2 text-gray-400"></i>
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Nhập email của bạn"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-lock mr-2 text-gray-400"></i>
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("mat_khau")}
                placeholder="Nhập mật khẩu của bạn"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all pr-12 ${
                  errors.mat_khau ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.mat_khau && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.mat_khau.message}
              </p>
            )}
          </div>
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
              <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
              <p className="text-red-600 text-sm">{loginError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Đăng nhập
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <i className="fas fa-shipping-fast mr-1"></i>
            Dành cho tài khoản Shipper
          </p>
        </div>
      </div>
    </div>
  );
}