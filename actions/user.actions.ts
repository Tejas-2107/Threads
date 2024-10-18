"use server";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "@/lib/models/community.model";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";
import { UpdateUser, UserProfile } from "@/types/interfaces";

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findById(userId, "-password").populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser({
  id,
  username,
  email,
  bio,
  pathname,
}: UpdateUser): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { _id: id },
      {
        username: username.toLowerCase(),
        email,
        bio,
      },
      { upsert: true }
    );

    if (pathname === "/profile/edit") {
      revalidatePath(pathname);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();
    const threads = await Thread.find({ author: userId })
      .populate({
        path: "author", // Populate the main post author
        model: User,
        select: "_id username imageUrl", // Select only specific fields of the author
      })
      .populate({
        path: "children", // Populate the children threads
        model: Thread,
        populate: {
          path: "author", // Populate the author within the children threads
          model: User,
          select: "_id username imageUrl", // Select specific fields of the author
        },
      })
      .exec();
    return threads;
  } catch (error: any) {
    throw new Error(`error while fetching user posts ${error.message}`);
  }
}

export async function searchUsersByUsername(
  serachParams: string,
  pageNumber:number
) {
  try {
    connectToDB();
    const pageSize = 10;
    const skipAmount = (pageNumber - 1) * pageSize;
    let query = {};
    if (serachParams.trim()) {
      //@ts-ignore
      query.username = { $regex: serachParams.trim(), $options: "i" };
    }
    const result = await User.find(query, "-password")
      .sort({ date: "desc" })
      .skip(skipAmount)
      .limit(pageSize);
    const totalUsersCount = await User.countDocuments(query);
    const isNext = totalUsersCount > result.length + skipAmount;
    const searchResult = result.map(
      ({
        _id,
        username,
        imageUrl,
      }: {
        _id: any;
        username: string;
        imageUrl: string;
      }) => ({
        id: _id.toString(),
        username,
        imageUrl,
      })
    );
    return { searchResult, isNext, totalUsersCount };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function repostThread(
  userId: string,
  postId: string,
  path: string
) {
  try {
    connectToDB();
    const thread = await Thread.findById(postId);
    if (!thread) {
      throw new Error("thread not found");
    }
    if (thread.author.toString() === userId) {
      throw new Error("you can not repost your own thread");
    }
    const repostThread = await Thread.create({
      text: thread.text,
      author: userId,
      isReposted: true,
      parentRePostId: postId,
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`error while reposting thread ${error.message}`);
  }
}

export async function deleteThreadById(
  userId: string,
  postId: string,
  path: string
) {
  try {
    connectToDB();
    const thread = await Thread.findById(postId);
    if (!thread) {
      throw new Error("thread not found");
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`error while deleting thread: ${error.message}`);
  }
}
