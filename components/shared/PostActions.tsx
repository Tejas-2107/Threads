"use client";
import Image from "next/image";
import {
  fetchPostLikesCount,
  fetchUserLikedPost,
  toggleLike,
} from "@/actions/like.actions";
import { useEffect, useState } from "react";
import { deleteThreadById } from "@/actions/user.actions";
import { usePathname } from "next/navigation";
const PostActions = ({
  userId,
  postId,
  currentUserId,
}: {
  userId: string;
  postId: string;
  currentUserId: string;
}) => {
  const [likes, setLikes] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const path=usePathname();
  const handleLike = async () => {
    try {
      await toggleLike(userId, postId);
      fetchInitialData();
    } catch (error: any) {
      throw new Error(`error while like or dislike operation ${error.message}`);
    }
  };
  const deleteThread = async() => {
    try {
      await deleteThreadById(userId,postId,path);
    } catch (error:any) {
      throw new Error(error.message)
    }
  };
  const fetchInitialData = async () => {
    try {
      const userLikedPosts: string[] = await fetchUserLikedPost(userId);
      const initialLikeCount: number = await fetchPostLikesCount(postId);
      setLikes(userLikedPosts);
      setLikeCount(initialLikeCount);
    } catch (error: any) {
      throw new Error(`error while fetching initial data ${error.message}`);
    }
  };
  useEffect(() => {
    fetchInitialData();
  }, [userId, postId]);
  return (
    <>
      <button
        onClick={handleLike}
        className="flex items-center gap-x-2"
        title="like"
      >
        <Image
          src={`/assets/${likes.includes(postId) ? "heart-filled" : "heart-gray"}.svg`}
          alt="icon"
          height={20}
          width={20}
          title={likes.includes(postId) ? "dislike" : "like"}
        />
        <p>{likeCount}</p>
      </button>
      {userId === currentUserId && (
        <button onClick={deleteThread} title="delete">
          <Image src="/assets/delete.svg" height={20} width={20} alt="icon" />
        </button>
      )}
    </>
  );
};

export default PostActions;
