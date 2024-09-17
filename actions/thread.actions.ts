"use server";
import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import { ThreadData } from "@/types/interfaces";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";

export async function creatThread(threadData: ThreadData): Promise<void> {
  const { userId, content, communityId, path } = threadData;
  try {
    connectToDB();
    const createdThread = await Thread.create({
      text: content,
      author: userId,
      community: null,
    });
    // Update User model
    await User.findByIdAndUpdate(userId, {
      $push: { threads: createdThread._id },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber: 1, pageSize: 20) {
  try {
    connectToDB();
    //calculate number posts to skip for pagination
    const skipAmount = (pageNumber - 1) * pageSize;
    const posts = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author", // Populating the 'author' field with user data
        select: "username imageUrl",
        model: "User",
      });
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const isNextPage = totalPostsCount > skipAmount + posts.length;

    return { posts, totalPostsCount, isNextPage };
  } catch (error: any) {
    throw new Error(`error while fetching posts: ${error.message}`);
  }
}

export async function fetchThreadById(threadId: string) {
  try {
    connectToDB();
    return await Thread.findById(threadId).populate({
      path: "author", // Populating the 'author' field with user data
      select: "_id username imageUrl",
      model: "User",
    });
  } catch (error: any) {
    throw new Error(`error while fetching thread data ${error.message}`);
  }
}

export async function postComment(
  currentUserId: string,
  threadId: string,
  commentText: string,
  path: string
) {
  try {
    connectToDB();
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("Thread not found");
    }
    const newThread = await Thread.create({
      text: commentText,
      author: currentUserId,
      parentId: threadId,
      community: null,
    });
    await originalThread.children.push(newThread._id);
    await originalThread.save();
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error while commenting ${error.message}`);
  }
}
