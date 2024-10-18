"use client";
import { PaginationProps } from "@/types/interfaces";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ isNextPage, serachParam="", path }: PaginationProps) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const searchParam = useSearchParams();
  console.log("sparams", searchParam);
  const handlePagination = () => {
    if (pageNumber > 1) {
      router.push(`/${path}?page=${pageNumber}`);
    } else {
      router.push(`${path}`);
    }
    
  };
  useEffect(() => {
    handlePagination();
  }, [pageNumber]);
  return (
    <div className="pagination flex justify-between items-center">
      <Button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Prev
      </Button>
      {pageNumber}
      <Button
        disabled={!isNextPage}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
