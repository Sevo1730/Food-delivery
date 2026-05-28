import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser extends Document {
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  role: UserRole;
  orderedFoods: mongoose.Types.ObjectId[];
  ttl?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 1 },
    phoneNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "FoodOrder" }],
    ttl: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
