import { Response } from "express";
import FoodOrder, { FoodOrderStatus } from "../models/FoodOrder";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";

export async function createOrder(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { foodOrderItems, totalPrice, deliveryAddress } = req.body;

    if (!foodOrderItems?.length || !totalPrice || !deliveryAddress) {
      res.status(400).json({ message: "Захиалгын мэдээлэл дутуу байна" });
      return;
    }

    const order = await FoodOrder.create({
      user: req.userId,
      foodOrderItems,
      totalPrice,
      deliveryAddress,
      status: FoodOrderStatus.PENDING,
    });

    await User.findByIdAndUpdate(req.userId, {
      $push: { orderedFoods: order._id },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function getMyOrders(req: AuthRequest, res: Response): Promise<void> {
  try {
    const orders = await FoodOrder.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function getAllOrders(_req: AuthRequest, res: Response): Promise<void> {
  try {
    const orders = await FoodOrder.find()
      .populate("user", "email phoneNumber")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function updateOrderStatus(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { status } = req.body;
    if (!Object.values(FoodOrderStatus).includes(status)) {
      res.status(400).json({ message: "Буруу статус" });
      return;
    }
    const order = await FoodOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      res.status(404).json({ message: "Захиалга олдсонгүй" });
      return;
    }
    res.json(order);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}
