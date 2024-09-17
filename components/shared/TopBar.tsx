"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const TopBar = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.delete("/api/users/logout");
      router.push("/sign-in");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <nav className="topbar bg-black-1 p-3 flex justify-between">
      <Link className="flex items-center gap-4 ml-8" href="/">
        <Image src="/logo.svg" alt="logo" width={20} height={20} />
        <p className="font-bold">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-x-2">
          <Image
            src="https://podcastr-images.s3.ap-south-1.amazonaws.com/cfe0aa89-b4c2-40eb-a91c-0f7f4c128120_pass.jpg"
            height={30}
            width={30}
            className="rounded-full"
            alt="profile picture"
          />
          <Button
            className="border border-solid border-blue-300"
            type="submit"
            variant="secondary"
            onClick={logout}
          >
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={20}
              height={20}
            />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
