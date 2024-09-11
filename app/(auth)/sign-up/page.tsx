"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { User } from "@/types/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    password: "",
    bio: "",
    image: null,
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (userData: User) =>
      axios.post("/api/users/sign-up", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      // Redirect to sign-in page on successful signup
      router.push("/sign-in");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setUserData({
        ...userData,
        [name]: files[0],
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };
  return (
    <div className="signup flex justify-center items-center h-screen">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          mutate(userData); // Pass FormData to mutation function
        }}
        method="post"
        className="mx-auto flex flex-col gap-y-3 w-1/4"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          required
          name="email"
          placeholder="Enter your email"
          autoComplete="off"
          onChange={handleChange}
        />
        <Label htmlFor="username">Username</Label>
        <Input
          required
          name="username"
          minLength={4}
          maxLength={10}
          placeholder="Enter your username"
          autoComplete="off"
          onChange={handleChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          required
          minLength={8}
          maxLength={12}
          name="password"
          placeholder="Enter your password"
          autoComplete="off"
          onChange={handleChange}
        />
        <Label htmlFor="image">Profiel Picture</Label>
        <Input
          required
          type="file"
          name="image"
          accept="image/*"
          className="bg-black-1"
          autoComplete="off"
          onChange={handleChange}
        />
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          name="bio"
          placeholder="Bio"
          className="bg-black-1"
          minLength={5}
          autoComplete="off"
          //@ts-ignore
          onChange={handleChange}
        />
        <Button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-400 ${isPending && "disabled"}`}
        >
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default page;
