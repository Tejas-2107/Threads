import { fetchPosts } from "@/actions/thread.actions";
import { fetchUserId } from "@/helper/fetchUserId";
import React from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const id = fetchUserId();
  if (!id) {
    return null;
  }
  const pageNumber = Number(searchParams?.page) || 1;
  const { posts, totalPostsCount, isNextPage } = await fetchPosts(pageNumber);
  return (
    <div className="home_page">
      <section>
        {posts.length === 0 ? (
          <p>No threds found</p>
        ) : (
          <>
            {posts.map(({ _id, text, author, createdAt, children }) => (
              <ThreadCard
                key={_id}
                currUserId={id}
                postId={_id}
                text={text}
                date={createdAt}
                imageUrl={author.imageUrl}
                username={author.username}
                userId={author._id}
                comments={children}
              />
            ))}
          </>
        )}
        <Pagination
          path="/"
          isNextPage={isNextPage}
        />
      </section>
    </div>
  );
};

export default Home;
