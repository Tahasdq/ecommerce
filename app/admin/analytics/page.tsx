// app/admin/analytics/page.tsx
"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { SalesChart } from "@/components/admin/SalesChart";
import { TrendingUp, Eye, ShoppingCart, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const trafficData = [
  { name: "Mon", visitors: 2400 },
  { name: "Tue", visitors: 1398 },
  { name: "Wed", visitors: 3800 },
  { name: "Thu", visitors: 3908 },
  { name: "Fri", visitors: 4800 },
  { name: "Sat", visitors: 3800 },
  { name: "Sun", visitors: 4300 },
];

const categoryData = [
  { name: "Electronics", value: 45, color: "hsl(217, 91%, 60%)" },
  { name: "Accessories", value: 25, color: "hsl(142, 71%, 45%)" },
  { name: "Furniture", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Other", value: 10, color: "hsl(220, 9%, 46%)" },
];

const topPages = [
  { page: "/products/headphones", views: 12543, conversion: 4.2 },
  { page: "/products/keyboard", views: 9876, conversion: 3.8 },
  { page: "/collections/new", views: 8654, conversion: 2.9 },
  { page: "/sale", views: 7432, conversion: 5.1 },
  { page: "/products/mouse", views: 6123, conversion: 3.2 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader title="Analytics" subtitle="Track your store performance" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Page Views" value="124,543" change={18.2} icon={Eye} iconColor="bg-blue-500/10 text-blue-500" />
          <StatCard title="Conversion Rate" value="3.24%" change={0.8} icon={TrendingUp} iconColor="bg-green-500/10 text-green-500" />
          <StatCard title="Cart Abandonment" value="68.4%" change={-2.1} icon={ShoppingCart} iconColor="bg-amber-500/10 text-amber-500" />
          <StatCard title="Avg. Order Value" value="$127.50" change={5.4} icon={CreditCard} iconColor="bg-purple-500/10 text-purple-500" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Chart */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Weekly Traffic</h3>
              <p className="text-sm text-muted-foreground">Unique visitors this week</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px" }} />
                  <Bar dataKey="visitors" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Sales by Category</h3>
              <p className="text-sm text-muted-foreground">Revenue distribution by product category</p>
            </div>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <SalesChart />

        {/* Top Pages */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Top Pages</h3>
            <p className="text-sm text-muted-foreground">Most visited pages and their conversion rates</p>
          </div>
          <div className="divide-y divide-border">
            {topPages.map((page) => (
              <div key={page.page} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{page.page}</p>
                  <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-sm font-medium ${page.conversion > 4 ? "text-green-500" : "text-muted-foreground"}`}>
                    {page.conversion > 4 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {page.conversion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
