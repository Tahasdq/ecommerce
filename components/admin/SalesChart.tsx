"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



export function SalesChart({totalSalesPerMonth}) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={totalSalesPerMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }} tickFormatter={(value) => `pkr ${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`pkr ${value.toLocaleString()}`, "Revenue"]}
            />
            <Area type="monotone" dataKey="totalSales" stroke="hsl(217, 91%, 60%)" strokeWidth={2} fill="url(#salesGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
