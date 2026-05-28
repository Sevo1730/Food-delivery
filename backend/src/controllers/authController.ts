import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../models/User";
import { AuthRequest } from "../middleware/auth";

function signToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, phoneNumber } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Имэйл болон нууц үг заавал шаардлагатай" });
      return;
    }
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409).json({ message: "Энэ имэйл бүртгэлтэй байна" });
      return;
    }
    const user = await User.create({ email, password, phoneNumber, role: UserRole.USER });
    const token = signToken(String(user._id), user.role);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch (err) {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
      return;
    }
    const token = signToken(String(user._id), user.role);
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role, isVerified: user.isVerified },
    });
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }
    res.json(user);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { phoneNumber, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { phoneNumber, address },
      { new: true, runValidators: true }
    ).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}
