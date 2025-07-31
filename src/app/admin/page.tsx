"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import AnalyticsDashboard from "./dashboard/AnalyticsDashboard";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-[#FDCA64] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-neutral-500">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/survey-dashboard">
              <Button
                color="primary"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Survey Dashboard
              </Button>
            </Link>
            <Button
              color="default"
              className="bg-black text-white hover:bg-neutral-800"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
          </div>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  );
}
