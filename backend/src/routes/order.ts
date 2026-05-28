import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);
router.post("/", createOrder);
router.get("/my", getMyOrders);
router.get("/all", getAllOrders);
router.patch("/:id/status", updateOrderStatus);

export default router;
