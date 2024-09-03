import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const SignIn = () => {
  return (
    <div className="signup flex justify-items-center">
      <form className="mx-auto flex flex-col gap-y-2">
      <Label htmlFor="password">Email</Label>
        <Input name="email" placeholder="Enter your email" />
        <Label htmlFor="password">Password</Label>
        <Input name="password" placeholder="Enter your password" />
        <Button type="submit" className="bg-orange-1 hover::black">Sign In</Button>
      </form>
    </div>
  );
};

export default SignIn;
