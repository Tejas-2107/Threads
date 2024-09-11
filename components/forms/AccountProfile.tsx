"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/actions/user.actions";
import { UserProfile } from "@/types/interfaces";
import { usePathname, useRouter } from "next/navigation";

const AccountProfile = ({ user }: UserProfile) => {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    const { username, bio, email } = userData;
    try {
      await updateUser({
        id: user.id,
        username,
        email,
        bio,
        pathname,
      });
      if (pathname === "/profile/edit") {
        router.back();
      } else {
        router.push("/");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      <Card className="w-[350px] mt-14">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  required
                  type="text"
                  minLength={5}
                  maxLength={10}
                  name="username"
                  defaultValue={user.username}
                  onChange={handleChange}
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  name="email"
                  defaultValue={user.email}
                  onChange={handleChange}
                />
                <Label htmlFor="bio">Bio</Label>
                <Input
                  required
                  minLength={5}
                  name="bio"
                  defaultValue={user.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
            <CardFooter className="flex justify-evenly mt-5">
              <Button
                type="reset"
                variant="secondary"
                className="border border-solid border-gray-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500">
                Update
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountProfile;
