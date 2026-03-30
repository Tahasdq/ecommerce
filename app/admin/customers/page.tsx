// app/admin/customers/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Search, MoreHorizontal, Eye, Mail, User } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserService from "@/services/user.service";

// onst customers = [
//   { id: "CUS-001", name: "Sarah Johnson", email: "sarah.j@email.com", orders: 12, spent: "$2,450.00", joined: "Dec 15, 2025", status: "Active" },
//   { id: "CUS-002", name: "Michael Chen", email: "m.chen@email.com", orders: 8, spent: "$1,890.00", joined: "Nov 28, 2025", status: "Active" },
//   { id: "CUS-003", name: "Emma Williams", email: "emma.w@email.com", orders: 15, spent: "$3,120.00", joined: "Oct 10, 2025", status: "Active" },
//   { id: "CUS-004", name: "James Wilson", email: "j.wilson@email.com", orders: 3, spent: "$456.00", joined: "Jan 05, 2026", status: "New" },
//   { id: "CUS-005", name: "Lisa Anderson", email: "lisa.a@email.com", orders: 22, spent: "$5,670.00", joined: "Aug 22, 2025", status: "VIP" },
//   { id: "CUS-006", name: "David Brown", email: "d.brown@email.com", orders: 6, spent: "$890.00", joined: "Dec 01, 2025", status: "Active" },
//   { id: "CUS-007", name: "Amy Lee", email: "amy.lee@email.com", orders: 0, spent: "$0.00", joined: "Jan 20, 2026", status: "Inactive" },
//   { id: "CUS-008", name: "Robert Taylor", email: "r.taylor@email.com", orders: 18, spent: "$4,230.00", joined: "Sep 14, 2025", status: "VIP" },
// ];c

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  New: "bg-blue-100 text-blue-800",
  VIP: "bg-purple-100 text-purple-800",
  Inactive: "bg-gray-100 text-gray-800",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}
interface customer{
  _id:string,
  email:string,
  status:string,
  createdAt:Date,
  totalOrders:Number,
  totalAmountSpent:Number
}

export default function CustomersPage() {
  const [customers,setCustomers]=useState<customer[]|null>()
  const userService = new UserService()
  const fetchCustomers = async ()=>{
    const filter = {type:"customer"}
      const fetchedCustomers = await userService.getAllUsers(filter)
      setCustomers(fetchedCustomers.data)
  }
  useEffect(()=>{
    fetchCustomers()
  },[])
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers?.filter((customer) =>
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <AdminHeader title="Customers" subtitle="Manage your customer relationships" />

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>

        {/* Customers Table */}
        <div className="bg-card rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers && filteredCustomers.map((customer) => (
                <TableRow key={customer._id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(customer.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.email}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer?.totalOrders?.toString()} orders</TableCell>
                  <TableCell className="font-medium">{customer?.totalAmountSpent?.toString()}</TableCell>
                  <TableCell>
                    <span className={`status-badge ${statusStyles[customer.status]}`}>{customer?.status}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{new Date(customer?.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="mr-2 h-4 w-4" />Send Email</DropdownMenuItem>
                        <DropdownMenuItem><User className="mr-2 h-4 w-4" />Edit Customer</DropdownMenuItem>
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
