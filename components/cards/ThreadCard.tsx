import { ThreadCardParams } from "@/types/interfaces";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PostActions from "../shared/PostActions";
import RepostThread from "../shared/RepostThread";
import Pagination from "../shared/Pagination";
const ThreadCard = ({
  currUserId,
  postId,
  text,
  username,
  date,
  imageUrl,
  comments,
  isComment,
  userId,
}: ThreadCardParams) => {
  return (
    <article
      className={`flex w-full flex-col rounded ${
        isComment ? "px-0 xs:px-7 p-4 ml-12" : "bg-black-1 mt-2 p-7"
      }`}
    >
      <div className="user_information flex items-center gap-x-2">
        <Link href={`/profile/${userId}`} className="flex items-center gap-x-2">
          <div className="relative h-12 w-12">
            <Image
              src={imageUrl}
              alt="user_logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h2>{username}</h2>
        </Link>
      </div>
      <h2 className="text-sm text-light-2 mt-2">{text}</h2>
      <div className="post_icons flex mt-2 gap-x-2">
        <PostActions userId={userId.toString()} postId={postId.toString()} currentUserId={currUserId} />
        <button title="reply">
          <Link href={`/thread/${postId}`}>
            <Image src="/assets/reply.svg" height={20} width={20} alt="icon" />
          </Link>
        </button>
        {userId != currUserId && (
          <RepostThread
            userId={currUserId.toString()}
            postId={postId.toString()}
          />
        )}
        <button title="share">
          <Image src="/assets/share.svg" height={20} width={20} alt="icon" />
        </button>
    
      </div>
    </article>
  );
};

export default ThreadCard;
