import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  walletAddress?: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  walletAddress: {
    type: String,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

export const User = mongoose.model<IUser>("User", UserSchema);
