"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onCreated?: (food: unknown) => void;
}

const schema = Yup.object({
  name: Yup.string().required("Нэр оруулна уу"),
  price: Yup.number().min(0).required("Үнэ оруулна уу"),
  description: Yup.string().required("Тайлбар оруулна уу"),
  category: Yup.string().required("Категори сонгоно уу"),
});

export default function CreateFoodDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", price: 0, description: "", category: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await new Promise((r) => setTimeout(r, 600));
      onCreated?.(values);
      resetForm();
      setOpen(false);
      setSubmitting(false);
    },
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-[#121316] px-5 py-2.5 text-sm font-black text-white hover:bg-zinc-800"
      >
        + Хоол нэмэх
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="mb-5 text-xl font-black text-[#121316]">Шинэ хоол нэмэх</h3>
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
              {[
                { id: "name", label: "Нэр", type: "text", placeholder: "Хоолны нэр" },
                { id: "price", label: "Үнэ ($)", type: "number", placeholder: "0.00" },
                { id: "description", label: "Тайлбар", type: "text", placeholder: "Хоолны тайлбар" },
                { id: "category", label: "Категори", type: "text", placeholder: "Appetizers" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label className="block text-sm font-bold text-[#121316] mb-1">{label}</label>
                  <input
                    id={id}
                    type={type}
                    {...formik.getFieldProps(id)}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E]"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={formik.isSubmitting} className="flex-1 rounded-full bg-[#E63B2E] py-3 font-black text-white hover:bg-red-600 disabled:opacity-60">
                  Хадгалах
                </button>
                <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-zinc-200 py-3 font-bold text-zinc-600 hover:bg-zinc-50">
                  Болих
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
