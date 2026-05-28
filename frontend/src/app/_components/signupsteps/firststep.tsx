"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

interface FirstStepValues {
  name: string;
  email: string;
}

interface Props {
  onNext: (values: FirstStepValues) => void;
}

const schema = Yup.object({
  name: Yup.string().min(2, "Нэр 2-оос дээш тэмдэгт").required("Нэрээ оруулна уу"),
  email: Yup.string().email("Имэйл буруу байна").required("Имэйл оруулна уу"),
});

export default function SignupFirstStep({ onNext }: Props) {
  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      onNext(values);
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-black text-[#121316] mb-1">Бүртгүүлэх — Алхам 1</h2>
      <p className="text-sm text-zinc-500 mb-6">Нэр болон имэйл хаягаа оруулна уу</p>
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {[
          { id: "name", label: "Нэр", type: "text", placeholder: "Таны нэр" },
          { id: "email", label: "Имэйл", type: "email", placeholder: "name@email.com" },
        ].map(({ id, label, type, placeholder }) => {
          const touched = formik.touched[id as keyof typeof formik.touched];
          const error = formik.errors[id as keyof typeof formik.errors];
          return (
            <div key={id}>
              <label className="block text-sm font-bold text-[#121316] mb-2">{label}</label>
              <input
                id={id}
                type={type}
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
        <button type="submit" className="w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600">
          Үргэлжлүүлэх
        </button>
      </form>
    </div>
  );
}
