"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Package, Settings, LogOut } from "lucide-react";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import useOrder from "@/hooks/admin/useOrder";
import { useAppSelector } from "@/lib/redux/hooks/hooks";
import { useRouter } from "next/navigation";

/* =====================
   Sub Components
===================== */

const ProfileTab = () => {
  const user =useAppSelector((state)=>state.user)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{user?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="font-medium">{user?.createdAt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OrdersTab = () => {
  const {orders , getOrdersByUserId} = useOrder()
  const userId =useAppSelector((state)=>state.user._id)
  useEffect(()=>{
    getOrdersByUserId(userId)
  },[userId])
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-medium">Order #{order?.orderId}</p>
              <p className="text-sm text-muted-foreground">{order?.createdAt.toLocaleString()}</p>
            </div>
            <span className="text-sm font-medium text-green-600">{order?.orderStatus}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline">Change Password</Button>
        <Button variant="outline">Manage Addresses</Button>
      </CardContent>
    </Card>
  );
};

/* =====================
   Main Page
===================== */

const UserDetailPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">(
    "profile"
  );
  const router = useRouter()
  const user =useAppSelector((state)=>state.user)
  const logout = async ()=>{
    await fetch("/api/logout" ,  { method: "POST" });
    router.push("/")
  }

  return (
    <Wrapper>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center gap-3">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-lg">{user.fullName??""}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              variant={activeTab === "profile" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>

            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("orders")}
            >
              <Package className="h-4 w-4" />
              Orders
            </Button>

            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>

            <Button onClick={logout} variant="destructive" className="mt-4 gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default UserDetailPage;