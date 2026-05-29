import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import foodRoutes from "./routes/food";
import orderRoutes from "./routes/order";
import categoryRoutes from "./routes/category";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "https://food-delivery-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((o) => origin.startsWith(o.replace(/\/$/, "")))) {
        callback(null, true);
      } else {
        callback(null, true); // allow all for now
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok", time: new Date() }));

// Connect MongoDB once (Vercel serverless caches connections)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nomnom");
  isConnected = true;
}

connectDB().catch(console.error);

// Local dev server
if (process.env.NODE_ENV !== "production" || process.env.LOCAL_DEV) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server → http://localhost:${PORT}`));
}

export default app;
