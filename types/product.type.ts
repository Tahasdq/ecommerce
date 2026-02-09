import { z } from "zod";

// Variant schema
const variantSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL"], {
    required_error: "Size is required",
  }),
  color: z.enum(["black", "white", "red", "blue", "green"], {
    required_error: "Color is required",
  }),
  stock: z
    .number({
      required_error: "stock is required",
      invalid_type_error: "stock must be a number",
    })
    .int("stock must be a whole number")
    .min(0, "stock cannot be negative"),
});

// Product schema with comprehensive validation
export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
  
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(parseFloat(val)), "Price must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Price must be greater than 0"),
  
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  
  star: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Rating must be a valid number")
    .refine(
      (val) => parseFloat(val) >= 1 && parseFloat(val) <= 5,
      "Rating must be between 1 and 5"
    ),
  
  stock: z
    .number({
      required_error: "stock is required",
      invalid_type_error: "stock must be a number",
    })
    .int("stock must be a whole number")
    .min(0, "stock cannot be negative"),
  
  sku: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "SKU must be at least 3 characters if provided"
    ),
  
  category: z.enum(["men" , "women" , "kids"  , "accessories" , "footwear"], {
    required_error: "Please select a category",
    invalid_type_error: "Invalid category selected",
  }),
  // status: z.enum(["outStock" , "inStock"  , "lowStock"], {
  //   required_error: "Please select a status",
  //   invalid_type_error: "Invalid status selected",
  // }),
  
  image: z
  .instanceof(File)
  .optional()
  .refine((file) => !file || file.size <= 5 * 1024 * 1024, "Each image must be less than 5MB")
,
  
  variants: z
    .array(variantSchema)
    .min(1, "At least one variant is required")
    .max(10, "Maximum 10 variants allowed"),
});

// TypeScript type inference
export type ProductFormValues = z.infer<typeof productSchema>;
export interface Product extends ProductFormValues {
  _id: string;
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
}