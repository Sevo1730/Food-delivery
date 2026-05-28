import mongoose, { Document, Schema } from "mongoose";

export interface IFoodCategory extends Document {
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}

const foodCategorySchema = new Schema<IFoodCategory>(
  {
    categoryName: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFoodCategory>("FoodCategory", foodCategorySchema);
