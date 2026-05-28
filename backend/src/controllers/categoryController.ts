import { Request, Response } from "express";
import FoodCategory from "../models/FoodCategory";

export async function getCategories(_req: Request, res: Response): Promise<void> {
  try {
    const categories = await FoodCategory.find().sort({ categoryName: 1 });
    res.json(categories);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      res.status(400).json({ message: "Категорийн нэр оруулна уу" });
      return;
    }
    const existing = await FoodCategory.findOne({ categoryName });
    if (existing) {
      res.status(409).json({ message: "Энэ категори аль хэдийн байна" });
      return;
    }
    const category = await FoodCategory.create({ categoryName });
    res.status(201).json(category);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  try {
    const category = await FoodCategory.findByIdAndUpdate(
      req.params.id,
      { categoryName: req.body.categoryName },
      { new: true, runValidators: true }
    );
    if (!category) {
      res.status(404).json({ message: "Категори олдсонгүй" });
      return;
    }
    res.json(category);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  try {
    await FoodCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Категори устгагдлаа" });
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}
