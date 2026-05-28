import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getCategories);
router.post("/", requireAuth, requireAdmin, createCategory);
router.patch("/:id", requireAuth, requireAdmin, updateCategory);
router.delete("/:id", requireAuth, requireAdmin, deleteCategory);

export default router;
