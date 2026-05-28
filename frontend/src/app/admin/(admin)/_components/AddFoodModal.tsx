"use client";

import { useRef, useState } from "react";
import { X, ImageIcon } from "lucide-react";

interface Props {
  categoryName: string;
  onClose: () => void;
  onAdd: (food: { foodName: string; price: number; ingredients: string; image: string }) => void;
}

export default function AddFoodModal({ categoryName, onClose, onAdd }: Props) {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!foodName || !price) return;
    onAdd({
      foodName,
      price: parseFloat(price),
      ingredients,
      image: imagePreview || "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80",
    });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#121316]">Add new Dish to {categoryName}</h2>
            <button onClick={onClose} className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors">
              <X className="h-4 w-4 text-zinc-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-zinc-500 mb-1">Food name</label>
              <input
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Type food name"
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-500 mb-1">Food price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price..."
                type="number"
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-zinc-500 mb-1">Ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List ingredients..."
              rows={3}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-zinc-500 mb-1">Food image</label>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden">
                <img src={imagePreview} alt="preview" className="w-full h-40 object-cover" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white shadow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 py-8 cursor-pointer hover:border-zinc-400 transition-colors"
              >
                <ImageIcon className="h-6 w-6 text-zinc-400" />
                <p className="text-sm text-zinc-400">Choose a file or drag & drop it here</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!foodName || !price}
              className="rounded-xl bg-[#121316] px-6 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors disabled:opacity-40"
            >
              Add Dish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
