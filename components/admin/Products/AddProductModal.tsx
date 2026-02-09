"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddProductModalProps,
  Category,
  Color,
  ProductFormValues,
  productSchema,
  Size,
  Status,
} from "@/types/product.type";
import { useState } from "react";
import { X, Plus, Upload } from "lucide-react";
import ProductService from "@/services/product.service";

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      star: "1",
      sku: "",
      category: undefined,
      variants: [{ size: "M", color: "black", stock:0 }],
      image: undefined,
      // status: "inStock",
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string>("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const payload = {
        ...data,
        stock: Number(data.stock),
        image: data.image,
      };
      console.log("Product payload:", payload);
      const productService = new ProductService();
      const result  = await productService.createProduct(payload);
      console.log("result " , result)
      
      // const products = JSON.parse(localStorage.getItem("products")??"")

      // localStorage.setItem("products" , JSON.stringify([...products,payload]))
      // TODO: send to API (multipart/form-data)
      // await createProduct(payload);

      onOpenChange(false);
      reset();
      setImagePreviews('');

    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (!file) return;
    console.log("imagePreviews", imagePreviews);

    // Clean up old preview
    if (imagePreviews) URL.revokeObjectURL(imagePreviews);

    // Set new image in form
    setValue("image", file, { shouldValidate: true });

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreviews(previewUrl);
  };

  const removeImage = () => {
    if (imagePreviews) URL.revokeObjectURL(imagePreviews); // Clean up
    setImagePreviews("");
    setValue("image", undefined, { shouldValidate: true }); // Clear form value
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      reset();
      setImagePreviews("");
    }
    onOpenChange(open);
  };

  const categories:Category[] = ["men" , "women" , "kids"  , "accessories" , "footwear"]
  const productStatus = [
    {store:"outStock" , show:'Out Of Stock'} ,{store:"inStock" , show:'In Stock'} ,{store:"lowStock" , show:'Low Stock'}
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Add Product
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a new product for your store. Fill in all required fields.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter product name"
                {...register("name")}
                className={
                  errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.name.message}
                </p>
              )}
            </div>

            {/* Price and SKU */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("price")}
                  className={
                    errors.price
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.price && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium">
                  SKU (Optional)
                </Label>
                <Input
                  id="sku"
                  placeholder="PROD-001"
                  {...register("sku")}
                  className={
                    errors.sku
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.sku && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.sku.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                rows={4}
                {...register("description")}
                className={
                  errors.description
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.description.message}
                </p>
              )}
            </div>

            {/* Category and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value: Category) =>
                    setValue("category", value, { shouldValidate: true })
                  }
                  defaultValue={watch("category")}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category}>
                        {category[0].toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label htmlFor="star" className="text-sm font-medium">
                Rating (1-5) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="star"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="1.0"
                {...register("star")}
                className={
                  errors.star ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
              {errors.star && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.star.message}
                </p>
              )}
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="images" className="text-sm font-medium">
                Product Image
              </Label>
              <div className="relative">
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`cursor-pointer ${errors.image ? "border-red-500" : ""}`}
                />
              </div>
              {errors.image && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>⚠</span> {errors.image.message}
                </p>
              )}

              {imagePreviews && (
                <div className="relative w-24 h-24 mt-3">
                  <img
                    src={imagePreviews}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Product Variants</Label>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600 mb-1">Size</Label>
                      <Select
                        value={watch(`variants.${index}.size`)}
                        onValueChange={(value: Size) =>
                          setValue(`variants.${index}.size`, value)
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1">
                      <Label className="text-xs text-gray-600 mb-1">
                        Color
                      </Label>
                      <Select
                        value={watch(`variants.${index}.color`)}
                        onValueChange={(value: Color) =>
                          setValue(`variants.${index}.color`, value)
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="stock" className="text-sm font-medium">
                        Stock <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        placeholder="0"
                        {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                        className={
                          errors.variants?.[index]?.stock
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className="mt-5 hover:bg-red-100 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ size: "M", color: "black" ,stock:1})}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
