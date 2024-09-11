"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { SignIn } from "@/types/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<SignIn>({
    email: "",
    password: "",
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (userData: SignIn) =>
      axios.post("/api/users/sign-in", userData),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <div className="signup flex justify-center items-center h-screen">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          mutate(userData);
        }}
        method="post"
        className="mx-auto flex flex-col gap-y-3 w-1/4"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          required
          name="email"
          autoComplete="off"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          required
          name="password"
          autoComplete="off"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={isPending}
          className={`bg-blue-500 hover:bg-blue-400 ${isPending && "disabled"}`}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default page;
