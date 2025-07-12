"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Spacer } from "@heroui/react";

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
          <Button
            color="default"
            className="bg-black text-white hover:bg-neutral-800"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border border-[#FDCA64]/20 hover:border-[#FDCA64]/50 transition-all duration-200">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Users</h2>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-bold text-[#FDCA64]">0</p>
              <p className="text-neutral-500 text-sm">Registered users</p>
              <Spacer y={2} />
              <Button
                size="sm"
                variant="flat"
                className="bg-black/5 hover:bg-black/10"
              >
                Manage Users
              </Button>
            </CardBody>
          </Card>

          <Card className="border border-[#FDCA64]/20 hover:border-[#FDCA64]/50 transition-all duration-200">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Services</h2>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-bold text-[#FDCA64]">0</p>
              <p className="text-neutral-500 text-sm">Active services</p>
              <Spacer y={2} />
              <Button
                size="sm"
                variant="flat"
                className="bg-black/5 hover:bg-black/10"
              >
                Manage Services
              </Button>
            </CardBody>
          </Card>

          <Card className="border border-[#FDCA64]/20 hover:border-[#FDCA64]/50 transition-all duration-200">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold">Revenue</h2>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-bold text-[#FDCA64]">$0.00</p>
              <p className="text-neutral-500 text-sm">Total revenue</p>
              <Spacer y={2} />
              <Button
                size="sm"
                variant="flat"
                className="bg-black/5 hover:bg-black/10"
              >
                View Analytics
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
