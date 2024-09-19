"use server";
import { connectToDB } from "@/lib/mongoose";
import Like from "@/lib/models/like.model";

export async function toggleLike(userId: string, postId: string) {
  try {
    connectToDB();
    const like = await Like.findOne({
      userId: userId,
      postId: postId,
    });
    if (like) {
      await Like.deleteOne({
        userId: userId,
        postId: postId,
      });
    } else {
      await Like.create({
        userId,
        postId,
      });
    }
  } catch (error: any) {
    throw new Error(`error while updating like counts ${error.message}`);
  }
}

export async function fetchUserLikedPost(userId: string) {
  try {
    connectToDB();
    const likedPostsIds = await Like.find({ userId }).select("postId").exec();
    return likedPostsIds.map((like): string => like.postId.toString());
  } catch (error: any) {
    throw new Error(`Error while fetching liked posts ${error.message}`);
  }
}
export async function fetchPostLikesCount(postId: string) {
  try {
    connectToDB();
    const likeCount = await Like.countDocuments({ postId });
    return likeCount;
  } catch (error: any) {
    throw new Error(`Error while fetching like count: ${error.message}`);
  }
}
