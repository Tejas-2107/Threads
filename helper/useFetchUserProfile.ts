'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { fetchToken } from "./fetchUserId";
export const useFetchUserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const id = "";
    if (!id) {
      router.push("/sign-in");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/profile?id=${id}`
        );
        if (!res.data.user.onboarded) {
          router.push("/onboarding");
        } else {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } 
    };

    fetchUser();
  }, [router]);

  return user;
};
