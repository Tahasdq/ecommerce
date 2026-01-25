// app/admin/products/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Package } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const products = [
  { id: "PRD-001", name: "Premium Headphones", category: "Electronics", price: "$129.00", stock: 45, status: "In Stock" },
  { id: "PRD-002", name: "Wireless Keyboard", category: "Electronics", price: "$89.00", stock: 32, status: "In Stock" },
  { id: "PRD-003", name: "USB-C Hub Pro", category: "Accessories", price: "$69.00", stock: 8, status: "Low Stock" },
  { id: "PRD-004", name: "Mechanical Mouse", category: "Electronics", price: "$59.00", stock: 0, status: "Out of Stock" },
  { id: "PRD-005", name: "Monitor Stand", category: "Furniture", price: "$49.00", stock: 67, status: "In Stock" },
  { id: "PRD-006", name: "Webcam HD Pro", category: "Electronics", price: "$149.00", stock: 23, status: "In Stock" },
  { id: "PRD-007", name: "Desk Organizer", category: "Furniture", price: "$35.00", stock: 5, status: "Low Stock" },
  { id: "PRD-008", name: "Cable Management Kit", category: "Accessories", price: "$25.00", stock: 89, status: "In Stock" },
];

const stockStatusStyles: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-800",
  "Low Stock": "bg-amber-100 text-amber-800",
  "Out of Stock": "bg-red-100 text-red-800",
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <AdminHeader title="Products" subtitle="Manage your product inventory" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>{product.stock} units</TableCell>
                  <TableCell>
                    <span className={`status-badge ${stockStatusStyles[product.status]}`}>{product.status}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit Product</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete Product</DropdownMenuItem>
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
