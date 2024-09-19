import React from "react";
import { fetchUserId } from "@/helper/fetchUserId";
import { redirect } from "next/navigation";
import { fetchUser, updateUser } from "@/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

const page = async () => {
  const id = fetchUserId();
  if (!id) {
    redirect("/sign-in");
  }
  const data = await fetchUser(id);
  const userData = {
    id,
    username: data.username,
    email: data.email,
    bio: data.bio,
  };

  return (
    <div className="edit_profile flex justify-center">
      <AccountProfile user={userData} />
    </div>
  );
};

export default page;
