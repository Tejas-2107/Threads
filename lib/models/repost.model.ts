import mongoose from "mongoose";

const repostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Thread schema
    ref: "Thread",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Repost = mongoose.models.Repost || mongoose.model("Repost", repostSchema);

export default Repost;
