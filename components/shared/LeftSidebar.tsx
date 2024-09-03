import React from "react";
import { LeftSidebarOptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";
const LeftSidebar = () => {
  return (
    <div className="h-full">
      <div className="sidebar_options flex flex-col gap-8">
        {LeftSidebarOptions.map(({ id, name, route, imgUrl }) => (
          <Link href={route} key={id} className="flex items-center gap-2 ">
            <Image src={imgUrl} alt={name} width={20} height={20} />
            <p>{name} </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
