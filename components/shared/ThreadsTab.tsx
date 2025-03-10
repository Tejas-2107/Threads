import { fetchUserPosts } from "@/actions/user.actions";
import { ThreadsTabProps } from "@/types/interfaces";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  const posts = await fetchUserPosts(accountId);
  return (
    <section>
      {posts.length === 0 ? (
        <h1 className="mt-28 text-center">No threads found</h1>
      ) : (
        /*@ts-ignore */
        posts.map(({ _id, text, author, children, createdAt }) => (
          <ThreadCard
            key={_id}
            currUserId={currentUserId}
            postId={_id}
            text={text}
            date={createdAt}
            imageUrl={author.imageUrl}
            username={author.username}
            userId={accountId}
            comments={children}
          />
        ))
      )}
    </section>
  );
};

export default ThreadsTab;
