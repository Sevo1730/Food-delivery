"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  name: string;
  email: string;
  onSubmit: (password: string) => Promise<void>;
}

const schema = Yup.object({
  password: Yup.string().min(6, "Нууц үг 6-аас дээш тэмдэгт").required("Нууц үг оруулна уу"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
    .required("Нууц үгийг давтана уу"),
});

export default function SignupSecondStep({ name, email, onSubmit }: Props) {
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ password }, { setSubmitting }) => {
      await onSubmit(password);
      setSubmitting(false);
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-black text-[#121316] mb-1">Бүртгүүлэх — Алхам 2</h2>
      <p className="text-sm text-zinc-500 mb-6">
        Сайн уу, <span className="font-semibold text-[#121316]">{name}</span>! Нууц үгээ тохируулна уу.
      </p>
      <div className="mb-4 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        <span className="font-semibold">Имэйл:</span> {email}
      </div>
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {[
          { id: "password", label: "Нууц үг", placeholder: "••••••••" },
          { id: "confirmPassword", label: "Нууц үг давтах", placeholder: "••••••••" },
        ].map(({ id, label, placeholder }) => {
          const touched = formik.touched[id as keyof typeof formik.touched];
          const error = formik.errors[id as keyof typeof formik.errors];
          return (
            <div key={id}>
              <label className="block text-sm font-bold text-[#121316] mb-2">{label}</label>
              <input
                id={id}
                type="password"
                {...formik.getFieldProps(id)}
                placeholder={placeholder}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  touched && error ? "border-red-400 bg-red-50" : "border-zinc-200 bg-zinc-50 focus:border-[#E63B2E]"
                }`}
              />
              {touched && error && <p className="mt-1.5 text-xs text-red-500">{error as string}</p>}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600 disabled:opacity-60"
        >
          {formik.isSubmitting ? "Бүртгэж байна..." : "Бүртгэл үүсгэх"}
        </button>
      </form>
    </div>
  );
}
