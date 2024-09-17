import { ThreadCardParams } from "@/types/interfaces";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const ThreadCard = ({
  currUserId,
  postId,
  text,
  username,
  date,
  imageUrl,
  comments,
}: ThreadCardParams) => {
  return (
    <article className="flex flex-col w-full rounded-xl bg-black-1 p-7 m-5 mx-auto">
      <div className="user_information flex items-center gap-x-2">
        <Image
          src={imageUrl}
          height={30}
          width={30}
          alt="profile_picture"
          className="rounded-full"
        />
        <h2>{username}</h2>
      </div>
      <h2 className="text-sm text-light-2 mt-2">{text}</h2>
      <div className="post_icons flex mt-2 gap-x-2">
        <button className="" title="like">
          <Image
            src="/assets/heart-gray.svg"
            height={20}
            width={20}
            alt="icon"
          />
        </button>
        <button title="reply">
          <Link href={`/thread/${postId}`}>
            <Image src="/assets/reply.svg" height={20} width={20} alt="icon" />
          </Link>
        </button>
        <button title="repost">
          <Image src="/assets/repost.svg" height={20} width={20} alt="icon" />
        </button>
        <button title="share">
          <Image src="/assets/share.svg" height={20} width={20} alt="icon" />
        </button>
      </div>
    </article>
  );
};

export default ThreadCard;
