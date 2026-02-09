// app/admin/products/page.tsx
"use client";

import { use, useEffect, useState } from "react";
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
import { Dialog } from "@/components/ui/dialog";
import {AddProductModal} from "@/components/admin/Products/AddProductModal";
import ProductService from "@/services/product.service";
import { Product, ProductFormValues } from "@/types/product.type";
import { toast } from "sonner";



const stockStatusStyles: Record<string, string> = {
  "inStock": "bg-green-100 text-green-800",
  "lowStock": "bg-amber-100 text-amber-800",
  "outOfStock": "bg-red-100 text-red-800",
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProductsModal, setShowAddProductsModal] = useState(false);
  const [products,setProducts]=useState<Product[]>([])

  const product= new ProductService()
  const fetchProducts = async () => {
        const products =  await product.getProducts()
        setProducts(products)
    }
  useEffect(()=>{
    
    
    fetchProducts()
  },[showAddProductsModal])

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const addProducts = ()=>{
  setShowAddProductsModal(true)
  }
  const deleteProduct = async (productId:string)=>{
    try {
      const product= new ProductService()
      await product.deleteProduct(productId)
      toast.success("Product deleted successfully")
      fetchProducts()
    } catch (error) {
      toast.error("Failed to delete product")
      fetchProducts()
    }
    
  }

  return (
    <div className="min-h-screen">
      <AdminHeader title="Products" subtitle="Manage your product inventory" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="gap-2" onClick={addProducts}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg border border-border max-h-[70vh] overflow-y-auto">
          <Table >
            <TableHeader className="!sticky top-0 z-10- bg-background">
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead> Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className=" w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product._id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product._id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>{product.stock} units</TableCell>
                  <TableCell>
                    <span
                      className={`status-badge ${stockStatusStyles[product.status]}`}
                    >
                      {"intock"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>deleteProduct(product._id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddProductModal
        open={showAddProductsModal}
        onOpenChange={setShowAddProductsModal}
      />
    </div>
  );
}
