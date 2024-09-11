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
}: UpdateUser):Promise<void> {
  try {
    connectToDB();
    console.log(username,email,bio)
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
