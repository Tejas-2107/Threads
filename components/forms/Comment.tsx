"use client";
import { CommentProps } from "@/types/interfaces";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { postComment } from "@/actions/thread.actions";
import { usePathname } from "next/navigation";
const Comment = ({ currentUserId, threadId, imageUrl }: CommentProps) => {
  const path = usePathname();
  const [commentText, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      await postComment(currentUserId, threadId, commentText, path);
      setComment("");
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="comment_form flex justify-between gap-x-2">
      <Image
        src={imageUrl}
        height={48}
        width={48}
        alt="profile"
        className="rounded-full"
      />
      <form
        method="post"
        className="flex items-center gap-x-3 w-full"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="commentText"
          className="border-b-2 border-gray-400 bg-black-2 focus:outline-none focus:border-none w-full h-12  rounded-lg p-2"
          placeholder="Comment..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          required
          value={commentText}
        />
        <Button
          type="submit"
          disabled={loading || commentText.length === 0}
          className="bg-blue-500 rounded-2xl"
        >
          {loading ? "Posting Comment" : "Commnet"}
        </Button>
      </form>
    </div>
  );
};

export default Comment;
