"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MapPin } from "lucide-react";
import Header from "@/app/_components/cards/Header";
import OrderContent from "@/app/_components/cart/Order-Content";
import { useCart } from "@/app/context/Cart-context";

const schema = Yup.object({
  locationType: Yup.string().oneOf(["delivery", "pickup"]).required(),
  address: Yup.string().when("locationType", {
    is: "delivery",
    then: (s) => s.min(5, "Хаяг бичнэ үү").required("Хаяг заавал бичнэ"),
    otherwise: (s) => s.notRequired(),
  }),
  district: Yup.string().when("locationType", {
    is: "delivery",
    then: (s) => s.required("Дүүрэг сонгоно уу"),
    otherwise: (s) => s.notRequired(),
  }),
  note: Yup.string(),
});

const districts = [
  "Баянгол дүүрэг", "Баянзүрх дүүрэг", "Сүхбаатар дүүрэг",
  "Чингэлтэй дүүрэг", "Хан-Уул дүүрэг", "Налайх дүүрэг",
  "Багануур дүүрэг", "Багахангай дүүрэг", "Сонгинохайрхан дүүрэг",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();

  const formik = useFormik({
    initialValues: { locationType: "delivery", address: "", district: "", note: "" },
    validationSchema: schema,
    onSubmit: async (_values, { setSubmitting }) => {
      try {
        await new Promise((r) => setTimeout(r, 800));
        clearCart();
        router.push("/success");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className="min-h-screen bg-[#3d3d3b]">
      <Header />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-black text-white">Хүргэлтийн мэдээлэл</h1>
        <p className="mb-10 text-zinc-400">Хаяг болон хүргэлтийн мэдээллээ оруулна уу</p>

        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-black/20">
          <div className="mb-8 flex gap-3">
            {[
              { value: "delivery", label: "🚚  Хүргэлт" },
              { value: "pickup", label: "🏪  Очиж авах" },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => formik.setFieldValue("locationType", value)}
                className={`flex-1 rounded-xl py-3 text-sm font-bold transition ${
                  formik.values.locationType === value ? "bg-[#E63B2E] text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            {formik.values.locationType === "delivery" && (
              <>
                <div>
                  <label className="block text-sm font-bold text-[#121316] mb-2">Дүүрэг</label>
                  <select
                    {...formik.getFieldProps("district")}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      formik.touched.district && formik.errors.district ? "border-red-400 bg-red-50" : "border-zinc-200 bg-zinc-50 focus:border-[#E63B2E]"
                    }`}
                  >
                    <option value="">Дүүрэг сонгоно уу</option>
                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {formik.touched.district && formik.errors.district && (
                    <p className="mt-1.5 text-xs text-red-500">{formik.errors.district}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#121316] mb-2">
                    <MapPin className="inline h-4 w-4 text-[#E63B2E] mr-1" />
                    Дэлгэрэнгүй хаяг
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("address")}
                    placeholder="Гудамж, байр, тоот..."
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      formik.touched.address && formik.errors.address ? "border-red-400 bg-red-50" : "border-zinc-200 bg-zinc-50 focus:border-[#E63B2E]"
                    }`}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">{formik.errors.address}</p>
                  )}
                </div>
              </>
            )}
            {formik.values.locationType === "pickup" && (
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-600">
                <p className="font-bold text-[#121316] mb-1">Очиж авах хаяг:</p>
                <p>NomNom Restaurant — Сүхбаатар дүүрэг, Их дэлгүүрийн зүүн тал</p>
                <p className="mt-1 text-zinc-400">Цаг: 10:00 – 22:00</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-[#121316] mb-2">Тэмдэглэл (заавал биш)</label>
              <textarea
                {...formik.getFieldProps("note")}
                rows={3}
                placeholder="Жишээ: 3 давхарт, хаалга цагаан..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E] resize-none"
              />
            </div>

            <OrderContent />

            <button
              type="submit"
              disabled={formik.isSubmitting || items.length === 0}
              className="w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {formik.isSubmitting ? "Захиалж байна..." : "Захиалга баталгаажуулах"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
