import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      max: 25,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 25,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      required: false,
    },
    viewedProfile: {
      type: Number,
    },
    impression: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
