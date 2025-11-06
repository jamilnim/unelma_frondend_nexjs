"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPanel() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role?.name.toLowerCase() !== "admin") {
      router.push("/login"); // redirect non-admins
    }
  }, [user, router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Panel</h1>
      <p>Manage your website content here.</p>
      {/* Later you can add services, hero, etc. */}
    </div>
  );
}
