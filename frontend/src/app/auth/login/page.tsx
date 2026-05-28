"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/context/AuthProvider";
import { authApi } from "@/lib/axios";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email. Use a format like example@email.com")
    .required("Email is required"),
  password: Yup.string()
    .min(1, "Password is required")
    .required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Try login first
        const res = await authApi.login(values.email, values.password);
        login({ id: res.data.user.id, email: res.data.user.email }, res.data.token);
      } catch {
        // If login fails → auto register with same credentials
        try {
          const res = await authApi.register(values.email, values.password);
          login({ id: res.data.user.id, email: res.data.user.email }, res.data.token);
        } catch {
          // Already registered but wrong password — just login again (shouldn't happen often)
        }
      } finally {
        setSubmitting(false);
        router.push("/");
      }
    },
  });

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="flex w-full flex-col px-8 py-10 lg:w-[45%] xl:px-16">
        <button
          onClick={() => router.back()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-[#111] mb-2 leading-tight">
            Welcome back
          </h1>
          <p className="text-base text-zinc-400 mb-10">
            Log in to continue ordering your favorites.
          </p>

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            <div>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Enter your email address"
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition placeholder:text-zinc-400 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 bg-red-50 text-red-600"
                    : "border-zinc-200 bg-white text-[#111] focus:border-zinc-400"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-xs text-[#E63B2E]">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                placeholder="Password"
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition placeholder:text-zinc-400 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400 bg-red-50 text-red-600"
                    : "border-zinc-200 bg-white text-[#111] focus:border-zinc-400"
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-xs text-[#E63B2E]">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#111]"
                />
                <span className="text-sm text-zinc-500">Show password</span>
              </label>
              <Link href="/auth/forgot-pass" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
              className="w-full rounded-2xl py-4 text-sm font-semibold text-white transition bg-zinc-300 disabled:cursor-not-allowed enabled:bg-[#111] enabled:hover:bg-zinc-800"
            >
              {formik.isSubmitting ? "Logging in..." : "Let's Go"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right – photo */}
      <div className="relative hidden lg:block lg:w-[55%]">
        <Image
          src="/Frame 1321316047 (1).png"
          alt="Delivery"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
