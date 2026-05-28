import { Request, Response } from "express";
import Food from "../models/Food";

export async function getFoods(req: Request, res: Response): Promise<void> {
  try {
    const { category } = req.query;
    const filter: Record<string, unknown> = { available: true };
    if (category) filter.category = category;
    const foods = await Food.find(filter).populate("category", "categoryName").sort({ createdAt: -1 });
    res.json(foods);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function getFoodById(req: Request, res: Response): Promise<void> {
  try {
    const food = await Food.findById(req.params.id).populate("category", "categoryName");
    if (!food) {
      res.status(404).json({ message: "Хоол олдсонгүй" });
      return;
    }
    res.json(food);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function createFood(req: Request, res: Response): Promise<void> {
  try {
    const { foodName, price, image, ingredients, category } = req.body;
    if (!foodName || !price || !image || !category) {
      res.status(400).json({ message: "Шаардлагатай талбарыг бөглөнө үү" });
      return;
    }
    const food = await Food.create({ foodName, price, image, ingredients, category });
    const populated = await food.populate("category", "categoryName");
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function updateFood(req: Request, res: Response): Promise<void> {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "categoryName");
    if (!food) {
      res.status(404).json({ message: "Хоол олдсонгүй" });
      return;
    }
    res.json(food);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function deleteFood(req: Request, res: Response): Promise<void> {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Хоол устгагдлаа" });
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}
