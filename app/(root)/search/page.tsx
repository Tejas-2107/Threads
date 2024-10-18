import { searchUsersByUsername } from "@/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchUser=searchParams?.q || "";
  const pageNumber=searchParams?.page || 1;
  const { searchResult, isNext, totalUsersCount } =await searchUsersByUsername(searchUser, pageNumber);
  return (
    <div className="serach">
      <SearchBar />
      {searchResult.length === 0 ? (
        <h1>No users found</h1>
      ) : (
        searchResult.map(({ username, imageUrl, id }) => (
          <UserCard
            key={id}
            username={username}
            imageUrl={imageUrl}
            userId={id}
          />
        ))
      )}
      <Pagination
        isNextPage={isNext}
        totalCount={totalUsersCount}
        path="search" 
      />
    </div>
  );
};

export default page;
