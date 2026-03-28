import { z } from "zod";

// Variant schema
const variantSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL"]),
  color: z.enum(["black", "white", "red", "blue", "green"]),
  stock: z
    .number({
      error: "stock is required",
    })
    .int("stock must be a whole number")
    .min(0, "stock cannot be negative"),
    _id:z.string().optional()
})

// Product schema with comprehensive validation
export const baseProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
  
  price: z
    .string()
    .min(1, "Price is required")
    .max(10000)
    .refine((val) => !isNaN(parseFloat(val)), "Price must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Price must be greater than 0"),
  
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  
  star: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Rating must be a valid number")
    .refine(
      (val) => parseFloat(val) >= 1 && parseFloat(val) <= 5,
      "Rating must be between 1 and 5"
    ),
  
  // stock: z
  //   .number({
  //     required_error: "stock is required",
  //     invalid_type_error: "stock must be a number",
  //   })
  //   .int("stock must be a whole number")
  //   .min(0, "stock cannot be negative"),
  
  sku: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "SKU must be at least 3 characters if provided"
    ),
  
  category: z.enum(["men" , "women" , "kids"  , "accessories" , "footwear" ]),
  // status: z.enum(["outStock" , "inStock"  , "lowStock"], {
  //   required_error: "Please select a status",
  //   invalid_type_error: "Invalid status selected",
  // }),
  
  image: z
  .instanceof(File)
  .refine((file) => !file || file.size <= 6 * 1024 * 1024, "Each image must be less than 5MB")
,
  
  variants: z
    .array(variantSchema)
    .min(1, "At least one variant is required")
    .max(10, "Maximum 10 variants allowed"),
});
export const createProductSchema = baseProductSchema
export const editProductSchema = baseProductSchema.extend({
image: z.instanceof(File).refine((file) => !file || file.size <= 5 * 1024 * 1024, "Each image must be less than 5MB").optional(),
})

// TypeScript type inference
export type baseProductFormValues = z.infer<typeof baseProductSchema>;
export type createProductFormValues = z.infer<typeof createProductSchema>;
export type editProductFormValues = z.infer<typeof editProductSchema>;
export interface Product extends baseProductFormValues {
  _id: string;
}
export interface ProductFetched extends Omit<Product,"image">{
  totalStock:number;
  status:string;
  imagePublicId:string;
}
// Individual field types for reuse
export type Category = "men" | "women" | "kids" | "accessories" | "footwear"
export type Size = "XS" | "S" | "M" | "L" | "XL";
export type Color = "black" | "white" | "red" | "blue" | "green";
export type Status= "outStock" | "inStock" | "lowStock"

export interface Variant {
  size: Size;
  color: Color;
}

/* =======================
   Types
======================= */

export interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action:string;
  setAction:(action:string)=>void;
  product:ProductFetched |null |undefined;
  setProduct:(product:ProductFetched |null)=>void;
}

export const productStatusEnum:Record<string,string> = {
    "outOfStock":"Out Of Stock",
    "inStock":"In Stock",
    "lowStock":"Low Stock"
  }
export   const categoriesEnum:Record<string,string> = {
    "men" : "Men",
    "women" : "Women",
    "kids" : "Kids",
    "accessories" : "Accessories",
    "footwear" : "Footwear"
  }
  export const stockStatusStyles: Record<string, string> = {
  "inStock": "bg-green-100 text-green-800",
  "lowStock": "bg-amber-100 text-amber-800",
  "outOfStock": "bg-red-100 text-red-800",
};

export const EMPTY_PRODUCT :ProductFetched= {
  name: "",
  price: "",
  description: "",
  star: "1",
  sku: "",
  category: "" as any,
  variants: [{ size: "" as any, color: "" as any, _id:"",stock: 0 }],
  totalStock:0,
  status:"",
  imagePublicId:"", 
  _id:"",
};