"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserProfile from "../../component/userProfile/UserProfile";


export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div style={{ padding: "2rem" }}>
      <UserProfile/>
    </div>
  );
}
