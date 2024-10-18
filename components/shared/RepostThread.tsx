"use client";
import { repostThread } from "@/actions/user.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const RepostThread = ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const path = usePathname();
  const handleRepost = async () => {
    try {
      await repostThread(userId, postId, path);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };
  return (
    <button onClick={handleRepost} title="repost">
      <Image src="/assets/repost.svg" height={20} width={20} alt="icon" />
    </button>
  );
};

export default RepostThread;
