import mongoose from "mongoose";

// Create user schema for MongoDB
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
