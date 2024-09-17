"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { usePathname, useRouter } from "next/navigation";
import { ThreadData } from "@/types/interfaces";
import { creatThread } from "@/actions/thread.actions";
const PostThread = ({ userId }: { userId: string }) => {
  const path = usePathname();
  const router = useRouter();
  const [threadData, setThread] = useState<ThreadData>({
    userId,
    content: "",
    communityId: null,
    path,
  });
  console.log(threadData.content)
  const handleSubmit = async() => {
    try {
      await creatThread(threadData);
      router.push('/');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <div className="create_thread">
      <form
        method="post"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-y-4 "
      >
        <Label htmlFor="content">Content</Label>
        <Textarea
          //@ts-ignore
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setThread({
              ...threadData,
              [name]: value,
            });
          }}
          name="content"
          autoComplete="off"
          className="bg-black-1 h-full min-h-48"
          required
          minLength={10}
          placeholder="Add content to create thread"
        />
        <Button
          disabled={threadData.content.trim().length < 10}
          className="bg-blue-500 w-full"
          type="submit"
        >
          Post Thread
        </Button>
      </form>
    </div>
  );
};

export default PostThread;
