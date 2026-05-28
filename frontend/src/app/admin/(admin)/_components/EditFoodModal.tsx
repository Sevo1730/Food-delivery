"use client";

import { useRef, useState } from "react";
import { X, Trash2, ImageIcon } from "lucide-react";

interface Food {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

interface Props {
  food: Food;
  categories: string[];
  onClose: () => void;
  onSave: (food: Food) => void;
  onDelete: (id: string) => void;
}

export default function EditFoodModal({ food, categories, onClose, onSave, onDelete }: Props) {
  const [name, setName] = useState(food.foodName);
  const [category, setCategory] = useState(food.category);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [price, setPrice] = useState(String(food.price));
  const [image, setImage] = useState(food.image);
  const [catOpen, setCatOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#121316]">Dishes info</h2>
            <button onClick={onClose} className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200">
              <X className="h-4 w-4 text-zinc-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-500 mb-1">Dish name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-zinc-500 mb-1">Dish category</label>
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-left"
              >
                <span>{category}</span>
                <span className="text-zinc-400">⌄</span>
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full mt-1 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10 overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setCatOpen(false); }}
                      className="block w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-zinc-500 mb-1">Ingredients</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-500 mb-1">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-500 mb-1">Image</label>
              {image ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={image} alt="preview" className="w-full h-40 object-cover" />
                  <button
                    onClick={() => setImage("")}
                    className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white shadow"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 py-6 cursor-pointer hover:border-zinc-400 transition-colors"
                >
                  <ImageIcon className="h-5 w-5 text-zinc-400" />
                  <p className="text-sm text-zinc-400">Choose a file or drag & drop it here</p>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => { onDelete(food.id); onClose(); }}
              className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 text-zinc-400 hover:border-red-300 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => { onSave({ ...food, foodName: name, category, ingredients, price: parseFloat(price), image }); onClose(); }}
              className="rounded-xl bg-[#121316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
