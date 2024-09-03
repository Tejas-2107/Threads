import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const TopBar = () => {
  const isUserLoggedIn = 0;
  return (
    <nav className="topbar bg-black-1 p-5 flex justify-between">
      <Link className="flex items-center gap-4" href="/">
        <p className="font-bold">Threads</p>
        <Image src="/images" alt="logo" width={20} height={20} />
      </Link>
      <div className="flex items-center gap-1">
        <div>
          {isUserLoggedIn ? (
            <Button className="bg-orange-1">Profile</Button>
          ) : (
            <Button className="bg-orange-1">Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
