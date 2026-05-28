import mongoose, { Document, Schema } from "mongoose";

export enum FoodOrderStatus {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

export interface IFoodOrderItem {
  food: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IFoodOrder extends Document {
  user: mongoose.Types.ObjectId;
  totalPrice: number;
  foodOrderItems: IFoodOrderItem[];
  status: FoodOrderStatus;
  deliveryAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const foodOrderItemSchema = new Schema<IFoodOrderItem>(
  {
    food: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const foodOrderSchema = new Schema<IFoodOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    foodOrderItems: [foodOrderItemSchema],
    status: {
      type: String,
      enum: Object.values(FoodOrderStatus),
      default: FoodOrderStatus.PENDING,
    },
    deliveryAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFoodOrder>("FoodOrder", foodOrderSchema);
