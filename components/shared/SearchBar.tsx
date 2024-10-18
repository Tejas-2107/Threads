"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
const SearchBar = () => {
  const [searchParams, setSearchParams] = useState("");
  const router = useRouter();
  const search = () => {
    if (searchParams.trim()) {
      router.push(`/search?q=${searchParams}`);
    } else {
      router.push("search");
    }
  };

  useEffect(() => {
    search();
  }, [searchParams]);
  return (
    <div className="search_bar">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchParams(e.target.value)
        }
        type="text"
        placeholder="Search users"
        className="mt-14 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
