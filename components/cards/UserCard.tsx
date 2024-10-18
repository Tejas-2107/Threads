"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { UserCardProps } from "@/types/interfaces";

function UserCard({ userId, username, imageUrl }: UserCardProps) {
  const router = useRouter();
  return (
    <article className="user-card flex justify-between mt-5">
      <div className="user-card_avatar flex items-center gap-x-5">
        <div className="relative h-12 w-12">
          <Image
            src={imageUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1 text-ellipsis">
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
      <Button
        className="bg-blue-500"
        onClick={() => {
          router.push(`/profile/${userId}`);
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
