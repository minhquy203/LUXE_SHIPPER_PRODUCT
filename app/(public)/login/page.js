"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
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
    <main className="bg-[#ebbd5b] w-full flex items-center justify-center h-full">
      <section className="pt-35 pb-20  relative">
        <div className="container mx-auto px-6 max-w-6xl ">
          <div className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="hidden md:block bg-auth relative">
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="text-white text-center">
                    <h3 className="text-6xl font-playfair font-bold mb-4">
                      LUXE
                    </h3>
                    <p className="mb-6">
                      &quot;Được tạo nên từ sự tinh tế, dành cho những tâm hồn thanh lịch.&quot;
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-white w-[450px] max-w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-playfair font-bold mb-2">
                    Đăng nhập
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="my-6">
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full border px-4 py-3 focus:outline-none input-focus ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Email của bạn"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-9">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("mat_khau")}
                        className={`w-full border px-4 py-3 focus:outline-none input-focus ${
                          errors.mat_khau ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Mật khẩu của bạn"
                      />
                      <button
                        type="button"
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {errors.mat_khau && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mat_khau.message}
                      </p>
                    )}

                    <Link
                      href="/forgot-password"
                      className="float-right text-sm text-accent hover:underline"
                    >
                      Bạn quên mật khẩu?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ebbd5b] text-white font-medium cursor-pointer hover:bg-[#e6b67bce] transition delay-10 mb-6"
                    disabled={isLoading}
                  >
                    Đăng nhập
                  </button>

                  <div className="flex items-center justify-center mb-6">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="px-4 text-gray-500 text-xl">Hoặc</span>
                    <div className="border-t border-gray-200 w-full"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() => console.log("Google login")}
                      className="cursor-pointer flex items-center justify-center py-2 border border-gray-200 hover:bg-gray-50 transition"
                    >
                      <img
                        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                        alt=""
                        className="w-8 h-8 mr-2"
                      />
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => console.log("Facebook login")}
                      className="cursor-pointer flex items-center justify-center py-2 border border-gray-200 hover:bg-gray-50 transition"
                    >
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_facebook-512.png"
                        alt=""
                        className="w-6 h-6 mr-2"
                      />
                      <span>Facebook</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d1991f]"></div>
          </div>
        )}
      </section>
    </main>
  );
}
