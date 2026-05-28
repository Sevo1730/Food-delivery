"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onNext: (email: string) => void;
}

const schema = Yup.object({
  email: Yup.string().email("Имэйл буруу байна").required("Имэйл оруулна уу"),
});

export default function FirstStep({ onNext }: Props) {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async ({ email }, { setSubmitting }) => {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitting(false);
      onNext(email);
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-black text-[#121316] mb-1">Нууц үг сэргээх</h2>
      <p className="text-sm text-zinc-500 mb-6">
        Бүртгэлтэй имэйл хаягаа оруулна уу. Баталгаажуулах код илгээнэ.
      </p>
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-[#121316] mb-2">Имэйл</label>
          <input
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="name@email.com"
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
              formik.touched.email && formik.errors.email
                ? "border-red-400 bg-red-50"
                : "border-zinc-200 bg-zinc-50 focus:border-[#E63B2E]"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600 disabled:opacity-60"
        >
          {formik.isSubmitting ? "Илгээж байна..." : "Код илгээх"}
        </button>
      </form>
    </div>
  );
}
