"use client";
import React from "react";
import { LeftSidebarOptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
const LeftSidebar = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="custom-scrollbar bg-black-1">
      <div className="sidebar_options flex flex-col gap-5 p-5">
        {LeftSidebarOptions.map(({ id, name, route, imgUrl }) => {
          const isActive = route === path;
          return (
            <Link
              href={route}
              key={id}
              className={`flex items-center w-full p-3 gap-2 mx-auto rounded-md ${isActive && "bg-blue-500"}`}
            >
              <Image src={imgUrl} alt={name} width={20} height={20} />
              <p>{name} </p>
            </Link>
          );
        })}
      </div>
      <div
        className="logout ml-6 mt-36"
        onClick={() => router.push("/sign-in")}
      >
      </div>
    </div>
  );
};

export default LeftSidebar;
