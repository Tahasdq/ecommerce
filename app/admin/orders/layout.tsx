import { AdminHeader } from "@/components/admin/AdminHeader";
import React from "react";

export default function OrderLayout({children}: {children: React.ReactNode}){
    return (
        <div className= "min-h-screen">
           <AdminHeader title="Orders" subtitle="Manage and track customer orders" />
           {children}
        </div>
    )
}