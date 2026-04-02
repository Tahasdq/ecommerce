"use client";

import { useForm, useFieldArray, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
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
  baseProductFormValues,
  categoriesEnum,
  Category,
  Color,
  createProductFormValues,
  createProductSchema,
  editProductFormValues,
  editProductSchema,
  EMPTY_PRODUCT,
  INITIALIZE_PRODUCT,
  Size,
} from "@/types/product.type";
import { X, Plus, Eye } from "lucide-react";
import ProductService from "@/services/product.service";
import { toast } from "sonner";
import Modal from "@/components/shared/Modal";
import { useEffect, useRef, useState } from "react";
import ImageViewer from "@/components/shared/ImageViewer/ImageViewer";

export function ProductModal({ open, onOpenChange ,product,setProduct,action , setAction}: AddProductModalProps) {
  const [isImageViewerOpen , setIsImageViewrOpen] =useState<boolean>(false)
  let schematype = Boolean(product)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    resetField,
    getValues,
    formState: { errors, isSubmitting,isDirty },
  } = useForm<createProductFormValues | editProductFormValues>({
    resolver: zodResolver(schematype ? editProductSchema : createProductSchema),
    defaultValues: INITIALIZE_PRODUCT
  });
  useEffect(()=>{
    if(product){
      reset({
        name: product.name,
        price: String(product.price),
        description: product.description,
        star: "1",
        sku: "",
        category: product.category,
        variants: (product.variants),
        // variants: JSON.parse(product.variants), ??????why errror
        // image: product.imagePublicId
      })
      setImagePreviews(`https://res.cloudinary.com/dvonwxpnl/image/upload/${product.imagePublicId}.jpg`)
    }
    
  },[product])
  useEffect(()=>{
    console.log('getValues',getValues())
  },[getValues()])

  useEffect(()=>{
    console.log("errors",errors)
  },[errors])

  const [imagePreviews, setImagePreviews] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data: (createProductFormValues | editProductFormValues)) => {
    try {
      
      const productService = new ProductService();
      const formData = new FormData();

      
      if(action=="edit"){
        if(!product) return;
        const raw =   getValues(undefined, { dirtyFields: true })
        const editPayload: Omit<editProductFormValues,'variants'> & {variants:string} = {
          ...raw,
        ...( raw.variants && {variants :JSON.stringify(raw.variants)}),
        ...( raw.image && {productImage :raw.image}),

        }
        delete editPayload.image // deleting it bcz backend ws giving error for two image bckedn supports one image  with name "productImage"
        for(let i=0 ;i<Object.values(editPayload).length;i++){
          const key = Object.keys(editPayload)[i] as keyof editProductFormValues
          const value = editPayload[key]
          if(!value)continue
          formData.append(String(key),value)
        }

        const result  = await productService.updateProductById(product._id , formData);
        console.log("result " , result)
        toast.success("Product updated successfully")
      }else{
        if (!data.category || !data.image) {
        toast.error("Please ensure all required fields are filled.");
        return;
      } 
      formData.append("name",data.name)
      formData.append("price",data.price)
      formData.append("description" , data.description)
      formData.append("category", data.category)
      formData.append("variants",JSON.stringify(data.variants))
      formData.append("productImage" , data.image)
        const result  = await productService.createProduct(formData);
        console.log("result " , result)
        toast.success("Product created successfully")
      }
     

      onOpenChange(false);
      reset();
      setImagePreviews('');
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

    } catch (error :any) {
      console.error("Failed to create product:", error);
      toast.error(error.message)
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
    setValue("image", file, { shouldValidate: true , shouldDirty:true });

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreviews(previewUrl);
  };

  const removeImage = () => {
    if (imagePreviews) URL.revokeObjectURL(imagePreviews); // Clean up
    setImagePreviews("");
    setValue("image",undefined,{ shouldValidate: true,shouldDirty: true })
    // resetField("image"); // Clear form value
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      getValues()
      reset(EMPTY_PRODUCT);
      setImagePreviews("");
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      setAction("");
      setProduct(null)
    }
    setAction("");
    onOpenChange(open);
  };
  const variantsWatcher = watch("variants");
  const isComboDisabled = (color: string, size: string, currentIndex: number) => {
  return variantsWatcher?.some((v, idx) => 
    idx !== currentIndex && v.color === color && v.size === size
  );
};

const openImageViewer = ()=>{
  setIsImageViewrOpen(true)
}
  return (
    
        <Modal open={open} handleClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {action!=="view" ? <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Add Product
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Create a new product for your store. Fill in all required fields.
              </DialogDescription>
            </DialogHeader>:<DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Product
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Viewing product details
              </DialogDescription>
            </DialogHeader>
            }

            <div className="grid gap-5 py-4">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  disabled={action === "view"}
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
                    disabled={action === "view"}
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
                    disabled={action === "view"}
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
                  disabled={action === "view"}
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
                   disabled={action === "view"}
                    onValueChange={(value: Category) =>
                      setValue("category", value, { shouldValidate: true,shouldDirty: true })
                    }
                    value={watch("category")}
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoriesEnum).map((key) => (
                      <SelectItem  value={key}>
                        {categoriesEnum[key]}
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
                  disabled={action === "view"}
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
                    ref={imageInputRef}
                    type="file"
                    disabled={action === "view"}
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
                 <div className="relative group w-24 h-24 mt-3 cursor-pointer">
            <img
              src={imagePreviews}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200"
            />

            {/* EYE ICON: We add 'group-hover/btn:opacity-0' */}
            <div onClick={openImageViewer} className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center transition-opacity duration-200 bg-black/20 rounded-lg">
              <Eye className="text-white" />
            </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the image click from firing
                    removeImage();
                  }}
                  disabled={action === "view"}
                  
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-20 hover:scale-110 transition-transform"
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
                      className="flex gap-2 flex-col"
                    ><div className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">

                    
                      <div className="flex-1">
                        <Label className="text-xs text-gray-600 mb-1">Size</Label>
                        <Select
                        disabled={action === "view"}
                          value={watch(`variants.${index}.size`)}
                          onValueChange={(value: Size) =>
                            setValue(`variants.${index}.size`, value,{ shouldValidate: true ,shouldDirty: true})
                          }
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent>
                            {["XS", "S", "M", "L", "XL"].map((s) => {
                              // Check if this size is already paired with the CURRENT row's color in ANOTHER row
                              const isDisabled = isComboDisabled(watch(`variants.${index}.color`), s as Size, index);
                              
                              return (
                                <SelectItem key={s} value={s} disabled={isDisabled}>
                                  {s} {isDisabled ? "(Already added)" : ""}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1">
                        <Label className="text-xs text-gray-600 mb-1">
                          Color
                        </Label>
                        <Select
                          value={watch(`variants.${index}.color`)}
                          disabled={action === "view"}
                          onValueChange={(value: Color) =>
                            setValue(`variants.${index}.color`, value ,{ shouldValidate: true ,shouldDirty: true})
                          }
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Color" />
                          </SelectTrigger>
                         <SelectContent>
                            {["black", "white", "red", "blue", "green"].map((c) => {
                              // Check if this color is already paired with the CURRENT row's size in ANOTHER row
                              const isDisabled = isComboDisabled(c as Color, watch(`variants.${index}.size`), index);
                              
                              return (
                                <SelectItem key={c} value={c} disabled={isDisabled}>
                                  <span className="capitalize">{c}</span> {isDisabled ? " (Taken)" : ""}
                                </SelectItem>
                              );
                            })}
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
                          disabled={action === "view"}
                          {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                          className={
                            errors.variants?.[index]?.stock
                              ? "border-red-500  focus-visible:ring-red-500"
                              : ""
                          }
                        />
                      </div>
                     

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length ===0 || action === "view"}
                        className="mt-5 hover:bg-red-100 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      </div>
                       {
                       errors?.variants&& errors?.variants[index] && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <span>⚠</span> {errors.variants[index]?.color?.message || errors.variants[index]?.size?.message || errors.variants[index]?.stock?.message}
                          </p>)
                      }
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ size: "" as any, color: "" as any ,stock:1})}
                  className="w-full"
                  disabled={action === "view"}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>
            </div>

            <DialogFooter className="gap-2">
              {action !== "view"? action!=="edit" ? (
                <>
                <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isSubmitting }
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
              </>
              ) :<>
                <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isSubmitting }
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting  || !isDirty  }>
                {isSubmitting ? "Saving..." : "Save Product"}
              </Button>
              </>
              : <Button
                type="button"
                variant="outline"
                onClick={() => {handleClose(false)}}
              >
                Back
              </Button>
            }
            </DialogFooter>
          </form>
          {isImageViewerOpen &&
            <ImageViewer
            isImageViewrOpen = {isImageViewerOpen}
            closeImageViewer = {()=>{
              setIsImageViewrOpen(false)
              if(action!=="edit"){URL.revokeObjectURL(imagePreviews)}
            }}
            imageData={imagePreviews}
            altText="Product image"
            />
          }
        </Modal>
      
  );
}
