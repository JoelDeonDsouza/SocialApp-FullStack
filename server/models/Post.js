import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    picturePath: {
      type: String,
      required: false,
    },
    userPicturePath: {
      type: String,
      required: false,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
