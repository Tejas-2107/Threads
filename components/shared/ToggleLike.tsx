"use client";
import Image from "next/image";
import {
  fetchPostLikesCount,
  fetchUserLikedPost,
  toggleLike,
} from "@/actions/like.actions";
import { useEffect, useState } from "react";
import { useOptimistic } from "react";
const ToggleLike = ({ userId, postId }: { userId: string; postId: string }) => {
  const [likes, setLikes] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const handleLike = async () => {
    try {
      await toggleLike(userId, postId);
      fetchInitialData()
    } catch (error: any) {
      throw new Error(`error while like or dislike operation ${error.message}`);
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
    <button onClick={handleLike} className="flex items-center gap-x-2" title="like" >
      <Image
        src={`/assets/${likes.includes(postId) ? "heart-filled" : "heart-gray"}.svg`}
        alt="icon"
        height={20}
        width={20}
        title={likes.includes(postId) ? "dislike" : "like"}
      />
      <p>{likeCount}</p>
    </button>
  );
};

export default ToggleLike;
