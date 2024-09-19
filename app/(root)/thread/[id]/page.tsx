import { fetchThreadById } from "@/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUserId } from "@/helper/fetchUserId";
import Comment from "@/components/forms/Comment";
import React from "react";
import { fetchUser } from "@/actions/user.actions";
import { comment } from "postcss";

const page = async ({ params }: { params: { id: string } }) => {
  const id = fetchUserId();
  if (!params.id || !id) return null;
  const thread = await fetchThreadById(params.id);
  const user = await fetchUser(id);
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
        userId={thread.author._id}
        comments={thread.children}
      />
      <div className="mt-7">
        <Comment
          currentUserId={id}
          threadId={thread.id}
          imageUrl={user.imageUrl}
        />
        {thread.children.length === 0 ? (
          <h2>No comments found</h2>
        ) : (
          thread.children.map((commnet: any) => (
            <ThreadCard
              key={commnet._id}
              currUserId={id}
              postId={commnet._id}
              text={commnet.text}
              date={commnet.createdAt}
              imageUrl={commnet.author.imageUrl}
              username={commnet.author.username}
              comments={commnet.children}
              userId={commnet.author._id}
              isComment={true}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default page;
