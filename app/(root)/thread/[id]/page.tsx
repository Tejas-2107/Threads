import { fetchThreadById } from "@/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchToken } from "@/helper/fetchToken";
import Comment from "@/components/forms/Comment";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = fetchToken();
  if (!params.id || !id) return null;
  const thread = await fetchThreadById(params.id);

  return (
    <section className="flex flex-col justify-center">
      <ThreadCard
        key={thread._id}
        currUserId={id}
        postId={thread._id}
        text={thread.text}
        date={thread.createdAt}
        imageUrl={thread.author.imageUrl}
        username={thread.author.username}
        comments={thread.children}
      />
      <div className="mt-7">
        <Comment
          currentUserId={id}
          threadId={thread.id}
          imageUrl={thread.author.imageUrl}
        />
      </div>
    </section>
  );
};

export default page;
