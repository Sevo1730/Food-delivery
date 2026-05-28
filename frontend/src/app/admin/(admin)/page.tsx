"use client";

import { useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import AddFoodModal from "./_components/AddFoodModal";
import EditFoodModal from "./_components/EditFoodModal";

interface Food {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

interface Category {
  name: string;
}

const INIT_CATEGORIES: Category[] = [
  { name: "Appetizers" }, { name: "Salads" }, { name: "Pizzas" },
  { name: "Lunch favorites" }, { name: "Main dishes" }, { name: "Fish & Sea foods" },
  { name: "Brunch" }, { name: "Side dish" }, { name: "Desserts" }, { name: "Beverages" },
];

const INIT_FOODS: Food[] = [
  { id: "1", foodName: "Finger food", price: 12.99, ingredients: "Creamy bites with herbs, fruit glaze, and crisp toast.", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=900&q=80", category: "Appetizers" },
  { id: "2", foodName: "Cranberry Brie Bites", price: 12.99, ingredients: "Soft brie, cranberry jam, crackers, and fresh chives.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80", category: "Appetizers" },
  { id: "3", foodName: "Brie Crostini Appetizer", price: 12.99, ingredients: "Roasted brie crostini with pomegranate and thyme.", image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80", category: "Appetizers" },
  { id: "4", foodName: "Sunshine Stackers", price: 12.99, ingredients: "Tomato bruschetta, whipped cheese, basil, and olive oil.", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80", category: "Appetizers" },
  { id: "5", foodName: "Steak Toast", price: 16.99, ingredients: "Sliced steak on garlic toast with pepper sauce.", image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?auto=format&fit=crop&w=900&q=80", category: "Appetizers" },
  { id: "6", foodName: "Grilled Chicken", price: 14.99, ingredients: "Juicy chicken breast with potatoes and tomato salsa.", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80", category: "Appetizers" },
  { id: "7", foodName: "Grilled Chicken Cobb Salad", price: 13.99, ingredients: "Fresh greens, grilled chicken, avocado, egg, and blue cheese.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", category: "Salads" },
  { id: "8", foodName: "Burrata Caprese", price: 14.99, ingredients: "Creamy burrata, heirloom tomatoes, basil, and aged balsamic.", image: "https://images.unsplash.com/photo-1608032364895-84e0c9e32f8b?auto=format&fit=crop&w=900&q=80", category: "Salads" },
  { id: "9", foodName: "Beetroot and orange salad", price: 11.99, ingredients: "Roasted beets, citrus segments, goat cheese, and walnuts.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80", category: "Salads" },
  { id: "10", foodName: "Pan Seared Salmon", price: 18.99, ingredients: "Crispy-skin salmon with lemon butter, capers, and dill.", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80", category: "Lunch favorites" },
  { id: "11", foodName: "Chicken Tagliatelle", price: 16.99, ingredients: "Pasta with grilled chicken, tomatoes, and cream sauce.", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80", category: "Lunch favorites" },
  { id: "12", foodName: "Tuna Steak", price: 22.99, ingredients: "Seared tuna with wasabi, ginger, and sesame crust.", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80", category: "Lunch favorites" },
];

export default function AdminFoodPage() {
  const [categories, setCategories] = useState<Category[]>(INIT_CATEGORIES);
  const [foods, setFoods] = useState<Food[]>(INIT_FOODS);
  const [activeCategory, setActiveCategory] = useState("All Dishes");
  const [addModal, setAddModal] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<Food | null>(null);
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [deleteToast, setDeleteToast] = useState<{ id: string; food: Food } | null>(null);

  const visibleCats = activeCategory === "All Dishes" ? categories : categories.filter((c) => c.name === activeCategory);
  const totalCount = foods.length;

  const handleAddFood = (cat: string, data: { foodName: string; price: number; ingredients: string; image: string }) => {
    const newFood: Food = { id: Date.now().toString(), category: cat, ...data };
    setFoods((prev) => [...prev, newFood]);
  };

  const handleSaveFood = (updated: Food) => {
    setFoods((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const handleDeleteFood = (id: string) => {
    const food = foods.find((f) => f.id === id);
    if (!food) return;
    setFoods((prev) => prev.filter((f) => f.id !== id));
    setDeleteToast({ id, food });
    setTimeout(() => setDeleteToast(null), 4000);
  };

  const handleUndoDelete = () => {
    if (!deleteToast) return;
    setFoods((prev) => [...prev, deleteToast.food]);
    setDeleteToast(null);
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    setCategories((prev) => [...prev, { name: newCatName.trim() }]);
    setNewCatName("");
    setAddCatOpen(false);
  };

  return (
    <div>
      {/* Delete toast */}
      {deleteToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-100 rounded-2xl bg-white border border-zinc-200 shadow-xl px-5 py-3 flex items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-[#121316]">Dish successfully deleted.</p>
            <p className="text-sm text-zinc-400">Would you like to undo this action?</p>
          </div>
          <button onClick={handleUndoDelete} className="text-sm font-bold text-[#E63B2E] hover:underline ml-2">Undo</button>
        </div>
      )}

      {/* Dishes category section */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-[#121316]">Dishes category</h2>
        <div className="flex flex-wrap gap-2">
          {/* All Dishes pill */}
          <button
            onClick={() => setActiveCategory("All Dishes")}
            className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeCategory === "All Dishes"
                ? "border-[#E63B2E] text-[#E63B2E]"
                : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
            }`}
          >
            All Dishes
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#121316] px-1 text-xs text-white">
              {totalCount}
            </span>
          </button>

          {categories.map((cat) => {
            const count = foods.filter((f) => f.category === cat.name).length;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activeCategory === cat.name
                    ? "border-[#E63B2E] text-[#E63B2E]"
                    : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                }`}
              >
                {cat.name}
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#121316] px-1 text-xs text-white">
                  {count}
                </span>
              </button>
            );
          })}

          {/* Add category button */}
          <button
            onClick={() => setAddCatOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E63B2E] text-white hover:bg-red-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add category modal */}
      {addCatOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setAddCatOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Add new category</h3>
                <button onClick={() => setAddCatOpen(false)} className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200">
                  <X className="h-4 w-4 text-zinc-500" />
                </button>
              </div>
              <label className="block text-sm text-zinc-500 mb-2">Category name</label>
              <input
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Type category name..."
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-400 mb-4"
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <div className="flex justify-end">
                <button onClick={handleAddCategory} className="rounded-xl bg-[#121316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800">
                  Add category
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Food sections */}
      <div className="space-y-6">
        {visibleCats.map((cat) => {
          const catFoods = foods.filter((f) => f.category === cat.name);
          return (
            <div key={cat.name} className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-[#121316]">
                {cat.name} <span className="text-zinc-400">({catFoods.length})</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {/* Add new dish card */}
                <button
                  onClick={() => setAddModal(cat.name)}
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#E63B2E]/40 p-6 text-center hover:border-[#E63B2E] transition-colors min-h-50"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E63B2E] text-white">
                    <Plus className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-zinc-500">Add new Dish to {cat.name}</p>
                </button>

                {/* Food cards */}
                {catFoods.map((food) => (
                  <div key={food.id} className="rounded-2xl border border-zinc-100 overflow-hidden bg-white hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={food.image}
                        alt={food.foodName}
                        className="h-36 w-full object-cover"
                      />
                      <button
                        onClick={() => setEditModal(food)}
                        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white shadow-md"
                      >
                        <Pencil className="h-3.5 w-3.5 text-[#E63B2E]" />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-[#E63B2E] truncate">{food.foodName}</p>
                        <p className="text-sm font-bold text-zinc-700 shrink-0 ml-2">${food.price.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{food.ingredients}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add food modal */}
      {addModal && (
        <AddFoodModal
          categoryName={addModal}
          onClose={() => setAddModal(null)}
          onAdd={(data) => handleAddFood(addModal, data)}
        />
      )}

      {/* Edit food modal */}
      {editModal && (
        <EditFoodModal
          food={editModal}
          categories={categories.map((c) => c.name)}
          onClose={() => setEditModal(null)}
          onSave={handleSaveFood}
          onDelete={handleDeleteFood}
        />
      )}
    </div>
  );
}
