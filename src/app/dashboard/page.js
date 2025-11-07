"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      {/* User can see services or content added by admin */}
    </div>
  );
}