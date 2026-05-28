import axios from "axios";
import { BackendFood, BackendOrder } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: { id: string; email: string; role: string } }>(
      "/auth/login", { email, password }
    ),
  register: (email: string, password: string, phoneNumber?: string) =>
    api.post<{ token: string; user: { id: string; email: string } }>(
      "/auth/register", { email, password, phoneNumber }
    ),
  getMe: () => api.get("/auth/me"),
};

export const foodApi = {
  getAll: () => api.get<BackendFood[]>("/foods"),
  getByCategory: (categoryId: string) =>
    api.get<BackendFood[]>(`/foods?category=${categoryId}`),
};

export const categoryApi = {
  getAll: () => api.get<{ _id: string; categoryName: string }[]>("/categories"),
};

export const orderApi = {
  create: (data: {
    foodOrderItems: { food: string; name: string; price: number; image: string; quantity: number }[];
    totalPrice: number;
    deliveryAddress: string;
  }) => api.post<BackendOrder>("/orders", data),

  getMyOrders: () => api.get<BackendOrder[]>("/orders/my"),

  getAllOrders: () => api.get<BackendOrder[]>("/orders/all"),

  updateStatus: (id: string, status: "PENDING" | "DELIVERED" | "CANCELED") =>
    api.patch<BackendOrder>(`/orders/${id}/status`, { status }),
};

export default api;
