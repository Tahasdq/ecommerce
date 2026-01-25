// app/admin/page.tsx
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { TopProducts } from "@/components/admin/TopProducts";
import { SalesChart } from "@/components/admin/SalesChart";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader title="Dashboard" subtitle="Welcome back, Admin" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$54,239"
            change={12.5}
            icon={DollarSign}
            iconColor="bg-green-500/10 text-green-500"
          />
          <StatCard
            title="Total Orders"
            value="1,429"
            change={8.2}
            icon={ShoppingCart}
            iconColor="bg-blue-500/10 text-blue-500"
          />
          <StatCard
            title="Total Customers"
            value="3,847"
            change={5.1}
            icon={Users}
            iconColor="bg-amber-500/10 text-amber-500"
          />
          <StatCard
            title="Total Products"
            value="284"
            change={-2.4}
            icon={Package}
            iconColor="bg-purple-500/10 text-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <TopProducts />
          </div>
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  );
}
