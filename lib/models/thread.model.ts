import mongoose from "mongoose";
const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  isReposted:{
    type:Boolean,
    default:false
  },
  parentRePostId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Thread",
    default:null
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
