"use client";
import React from "react";
import { LeftSidebarOptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const LeftSidebar = ({userId}:{userId:string}) => {
  const path = usePathname();
  return (
    <div className="custom-scrollbar bg-black-1">
      <div className="sidebar_options flex flex-col gap-5 p-5">
        {LeftSidebarOptions.map(({ id, name, route, imgUrl }) => {
          const isActive = route === path;
          if (route === "/profile") route = `${route}/${userId}`;
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
    </div>
  );
};

export default LeftSidebar;
