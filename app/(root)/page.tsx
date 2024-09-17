import { fetchPosts } from "@/actions/thread.actions";
import { fetchToken } from "@/helper/fetchToken";
import React from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser } from "@/actions/user.actions";
const Home = async () => {
  const id = fetchToken();
  const {posts,totalPostsCount,isNextPage} = await fetchPosts(1,20);
  return (
    <div className="home_page">
      <section>
        {posts.length === 0 ? (
          <p>No threds found</p>
        ) : (
          <>
            {posts.map(({ _id, text, author, createdAt,children }) => (
              <ThreadCard
                key={_id}
                currUserId={id}
                postId={_id}
                text={text}
                date={createdAt}
                imageUrl={author.imageUrl}
                username={author.username}
                comments={children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
