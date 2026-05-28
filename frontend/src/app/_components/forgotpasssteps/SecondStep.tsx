"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  email: string;
  onSuccess: () => void;
}

const schema = Yup.object({
  code: Yup.string().length(6, "Код 6 оронтой байна").required("Код оруулна уу"),
  password: Yup.string().min(6, "Нууц үг 6-аас дээш тэмдэгт").required("Нууц үг оруулна уу"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна")
    .required("Нууц үгийг давтана уу"),
});

export default function SecondStep({ email, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: { code: "", password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async (_, { setSubmitting }) => {
      await new Promise((r) => setTimeout(r, 800));
      setSubmitting(false);
      onSuccess();
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-black text-[#121316] mb-1">Шинэ нууц үг тохируулах</h2>
      <p className="text-sm text-zinc-500 mb-6">
        <span className="font-semibold text-[#121316]">{email}</span> руу илгээсэн 6 оронтой кодыг оруулна уу.
      </p>
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {[
          { id: "code", label: "Баталгаажуулах код", type: "text", placeholder: "123456" },
          { id: "password", label: "Шинэ нууц үг", type: "password", placeholder: "••••••••" },
          { id: "confirmPassword", label: "Нууц үг давтах", type: "password", placeholder: "••••••••" },
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
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600 disabled:opacity-60"
        >
          {formik.isSubmitting ? "Хадгалж байна..." : "Нууц үг шинэчлэх"}
        </button>
      </form>
    </div>
  );
}
