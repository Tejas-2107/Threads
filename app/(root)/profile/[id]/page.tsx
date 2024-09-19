import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchUser } from "@/actions/user.actions";
import { fetchUserId } from "@/helper/fetchUserId";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { profileTabs } from "@/constants";
const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const currentUserId = fetchUserId();
  const userData = await fetchUser(params.id);
  return (
    <div className="profile mt-12">
      <div className="flex items-center gap-x-2 p-2">
        <Image
          src={userData.imageUrl}
          alt="profile pic"
          height={64}
          width={100}
          className="rounded-full"
        />
        <h1 className="font-light text-gray-1">@{userData.username}</h1>
      </div>
      <div>
        <h1 className="font-light">{userData.bio}</h1>
        {currentUserId === params.id && (
          <Link href={`/profile/edit`} className="mx-auto">
            <Button className="bg-blue-500 w-full mt-3">Edit</Button>
          </Link>
        )}
      </div>
      <div className="tabs mt-10">
        <Tabs defaultValue="threads" className="bg-black-1 p-1 rounded-sm">
          <TabsList className="tab flex items-center justify-between justify-items-center">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="tab flex items-center gap-x-1"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userData.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={currentUserId}
                accountId={params.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default page;
