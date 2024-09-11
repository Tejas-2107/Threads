import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchToken } from "@/helper/fetchToken";
import { redirect } from "next/navigation";
import { fetchUser } from "@/actions/user.actions";
const page = async () => {
  const id = fetchToken();
  if (!id) {
    redirect("/sign-in");
  }
  const data = await fetchUser(id);
  return (
    <div className="profile">
      <Card className="w-[350px] mt-14">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Image
                src={data.imageUrl}
                alt="profile pic"
                height={40}
                width={140}
                className="rounded-full mx-auto"
              />
              <h1>Username: {data.username}</h1>
              <h1>Email: {data.email}</h1>
              <h1>Bio: {data.bio}</h1>
            </div>
          </div>
        </CardContent>
        <CardFooter className="">
          <Button className="bg-blue-500">
            <Link href="/profile/edit" className="mx-auto">
              Edit
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
