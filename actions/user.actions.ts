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
    const threads = await User.findById(userId).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id username parentId imageUrl", // Select only _id and username fields of the author
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "username imageUrl _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error: any) {
    throw new Error(`error while fetching user posts ${error.message}`);
  }
}
