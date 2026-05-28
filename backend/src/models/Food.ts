import mongoose, { Document, Schema } from "mongoose";

export interface IFood extends Document {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: mongoose.Types.ObjectId;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const foodSchema = new Schema<IFood>(
  {
    foodName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFood>("Food", foodSchema);
