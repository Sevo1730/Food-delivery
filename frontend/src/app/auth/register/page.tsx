"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/context/AuthProvider";
import { authApi } from "@/lib/axios";

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email. Use a format like example@email.com")
    .required("Email is required"),
});

const passwordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [emailValue, setEmailValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: (values, { setSubmitting }) => {
      setEmailValue(values.email);
      setSubmitting(false);
      setStep(2);
    },
  });

  const passwordFormik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: passwordSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await authApi.register(emailValue, values.password);
        login({ id: res.data.user.id, email: res.data.user.email }, res.data.token);
        router.push("/");
      } catch (err: unknown) {
        const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
        setFieldError("password", msg || "Бүртгэхэд алдаа гарлаа");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="flex w-full flex-col px-8 py-10 lg:w-[45%] xl:px-16">
        <button
          onClick={() => (step === 1 ? router.back() : setStep(1))}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-1 flex-col justify-center">
          {step === 1 ? (
            <>
              <h1 className="text-4xl font-extrabold text-[#111] mb-2 leading-tight">
                Create your account
              </h1>
              <p className="text-base text-zinc-400 mb-10">
                Sign up to explore your favorite dishes.
              </p>

              <form onSubmit={emailFormik.handleSubmit} noValidate className="space-y-5">
                <div>
                  <input
                    type="email"
                    {...emailFormik.getFieldProps("email")}
                    placeholder="Enter your email address"
                    className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition placeholder:text-zinc-400 ${
                      emailFormik.touched.email && emailFormik.errors.email
                        ? "border-red-400 bg-red-50 text-red-600"
                        : "border-zinc-200 bg-white text-[#111] focus:border-zinc-400"
                    }`}
                  />
                  {emailFormik.touched.email && emailFormik.errors.email && (
                    <p className="mt-2 text-xs text-[#E63B2E]">{emailFormik.errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!emailFormik.dirty || !emailFormik.isValid}
                  className="w-full rounded-2xl py-4 text-sm font-semibold text-white transition bg-zinc-300 disabled:cursor-not-allowed enabled:bg-[#111] enabled:hover:bg-zinc-800"
                >
                  Let&apos;s Go
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold text-[#111] mb-2 leading-tight">
                Create a strong password
              </h1>
              <p className="text-base text-zinc-400 mb-10">
                Create a strong password with letters, numbers.
              </p>

              <form onSubmit={passwordFormik.handleSubmit} noValidate className="space-y-5">
                <input
                  type={showPassword ? "text" : "password"}
                  {...passwordFormik.getFieldProps("password")}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm outline-none transition placeholder:text-zinc-400 text-[#111] focus:border-zinc-400"
                />
                {passwordFormik.touched.password && passwordFormik.errors.password && (
                  <p className="text-xs text-[#E63B2E]">{passwordFormik.errors.password}</p>
                )}

                <input
                  type={showPassword ? "text" : "password"}
                  {...passwordFormik.getFieldProps("confirmPassword")}
                  placeholder="Confirm password"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm outline-none transition placeholder:text-zinc-400 text-[#111] focus:border-zinc-400"
                />
                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                  <p className="text-xs text-[#E63B2E]">{passwordFormik.errors.confirmPassword}</p>
                )}

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#111]"
                  />
                  <span className="text-sm text-zinc-500">Show password</span>
                </label>

                <button
                  type="submit"
                  disabled={passwordFormik.isSubmitting}
                  className="w-full rounded-2xl bg-[#111] py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
                >
                  {passwordFormik.isSubmitting ? "Creating..." : "Let's Go"}
                </button>
              </form>
            </>
          )}

          <p className="mt-10 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right – photo */}
      <div className="relative hidden lg:block lg:w-[55%]">
        <Image
          src="/frame-banner.png"
          alt="Delivery"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
