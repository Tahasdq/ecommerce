// app/admin/orders/page.tsx
"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const orders = [
  { id: "#ORD-7352", customer: "Sarah Johnson", email: "sarah.j@email.com", items: 3, amount: "$256.00", status: "Completed", date: "Jan 25, 2026", payment: "Credit Card" },
  { id: "#ORD-7351", customer: "Michael Chen", email: "m.chen@email.com", items: 2, amount: "$189.50", status: "Processing", date: "Jan 25, 2026", payment: "PayPal" },
  { id: "#ORD-7350", customer: "Emma Williams", email: "emma.w@email.com", items: 5, amount: "$432.00", status: "Pending", date: "Jan 24, 2026", payment: "Credit Card" },
  { id: "#ORD-7349", customer: "James Wilson", email: "j.wilson@email.com", items: 1, amount: "$78.00", status: "Completed", date: "Jan 24, 2026", payment: "Debit Card" },
  { id: "#ORD-7348", customer: "Lisa Anderson", email: "lisa.a@email.com", items: 4, amount: "$567.00", status: "Cancelled", date: "Jan 23, 2026", payment: "Credit Card" },
  { id: "#ORD-7347", customer: "David Brown", email: "d.brown@email.com", items: 2, amount: "$234.00", status: "Completed", date: "Jan 23, 2026", payment: "PayPal" },
  { id: "#ORD-7346", customer: "Amy Lee", email: "amy.lee@email.com", items: 6, amount: "$890.00", status: "Processing", date: "Jan 22, 2026", payment: "Credit Card" },
  { id: "#ORD-7345", customer: "Robert Taylor", email: "r.taylor@email.com", items: 3, amount: "$345.00", status: "Pending", date: "Jan 22, 2026", payment: "Debit Card" },
];

const statusStyles: Record<string, string> = {
  Completed: "status-completed",
  Processing: "status-processing",
  Pending: "status-pending",
  Cancelled: "status-cancelled",
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <AdminHeader title="Orders" subtitle="Manage and track customer orders" />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{order.payment}</TableCell>
                  <TableCell>
                    <span className={cn("status-badge", statusStyles[order.status])}>{order.status}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit Order</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
