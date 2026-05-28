"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { MenuItem } from "@/types";

interface Props {
  food: MenuItem;
  onSave?: (food: MenuItem) => void;
  onCancel?: () => void;
}

const schema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().min(0).required(),
  description: Yup.string().required(),
});

export default function EditFood({ food, onSave, onCancel }: Props) {
  const formik = useFormik({
    initialValues: { name: food.name, price: food.price, description: food.description },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      await new Promise((r) => setTimeout(r, 500));
      onSave?.({ ...food, ...values });
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-3">
      <input
        {...formik.getFieldProps("name")}
        placeholder="Нэр"
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E]"
      />
      <input
        type="number"
        {...formik.getFieldProps("price")}
        placeholder="Үнэ"
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E]"
      />
      <textarea
        {...formik.getFieldProps("description")}
        rows={3}
        placeholder="Тайлбар"
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E] resize-none"
      />
      <div className="flex gap-2">
        <button type="submit" disabled={formik.isSubmitting} className="flex-1 rounded-full bg-[#E63B2E] py-2.5 text-sm font-black text-white hover:bg-red-600 disabled:opacity-60">
          Хадгалах
        </button>
        <button type="button" onClick={onCancel} className="flex-1 rounded-full border border-zinc-200 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-50">
          Болих
        </button>
      </div>
    </form>
  );
}
