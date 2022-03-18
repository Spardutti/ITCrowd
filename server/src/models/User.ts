import { Schema, model } from "mongoose";
import { User } from "../interface/interface";

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
  }
}

const UserSchema = new Schema<User>({
  username: String,
  password: String,
  email: String,
  isAdmin: { type: Boolean, default: false },
});

export const UserModel = model<User>("User", UserSchema);
