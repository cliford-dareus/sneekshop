"use client";
import React, { useState, useTransition } from "react";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import Label from "../ui/label";
import { $Enums, Prisma } from "@prisma/client";
import { getSubCategories, productsColors } from "@/config/products";
import ImagesFilesInput from "../images_files_input";
import { FileWithPreview } from "@/libs/type";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { createProduct, isProductUnique } from "@/app/_actions/product";
import Button from "../ui/button";

type Props = {
  sellerId: string;
};

export interface InputProps {
  id: string;
  title: string;
  description: string;
  category: $Enums.Category;
  subCategory: string;
  price: number;
  color: string | string[];
  images: File[];
  inventory: number;
}

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const CreateProductForm = ({ sellerId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const form = useForm<InputProps>({
    defaultValues: {
      category: "CLOTHING",
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {});
  const subcategories = getSubCategories(form.watch("category"));

  const onsubmit = (data: InputProps) => {
    startTransition(async () => {
      try {
        await isProductUnique({ title: data.title });

        const images = Array.isArray(files)
          ? await startUpload(data.images).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }));
              return formattedImages ?? null;
            })
          : null;

        await createProduct({
          ...data,
          images: images as Prisma.JsonValue,
          sellerId,
          tags: ["NEW"],
        });

        form.reset();
        setFiles(null);
      } catch (error) {}
    });
  };

  return (
    <div className="p-4 border border-slate-700 rounded-md">
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <div className="flex flex-col">
          <Label name="Product name" />
          <Input
            placeholder=""
            name="title"
            type="text"
            register={form.register}
            errors={form.formState.errors}
          />
        </div>

        <div className="flex flex-col">
          <Label name="Product description" />
          <Input
            placeholder=""
            name="description"
            type="text"
            register={form.register}
            errors={form.formState.errors}
          />
        </div>

        <div className="flex flex-col">
          <Label name="Product category" />
          <select
            className="text-black"
            {...form.register("category")}
            name="category"
          >
            {Object.keys($Enums.Category).map((Category) => (
              <option key={Category} value={Category}>
                {Category.toLocaleLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <Label name="Product subcategory" />
          <select
            className="text-black"
            {...form.register("subCategory")}
            name="subCategory"
          >
            {subcategories.map((sub) => (
              <option key={sub.label} value={sub.value}>
                {sub.label.toLocaleLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <Label name="Product price" />
          <Input
            placeholder=""
            name="price"
            type="number"
            register={form.register}
            errors={form.formState.errors}
          />
        </div>

        <div className="flex flex-col">
          <Label name="Product inventory" />
          <Input
            placeholder=""
            name="inventory"
            type="number"
            register={form.register}
            errors={form.formState.errors}
          />
        </div>

        <div className="flex flex-col">
          <Label name="Product color" />
          <select
            className="text-black"
            multiple
            {...form.register("color")}
            name="color"
          >
            <optgroup>
              {productsColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <>
          <Label name="Product image" />
          <ImagesFilesInput
            files={files}
            setFiles={setFiles}
            name="images"
            disabled={isPending}
            isUploading
            maxSize={1024 * 1024 * 4}
            maxFiles={3}
            setvalue={form.setValue}
          />
        </>
        <Button className="bg-red-600">Add Product</Button>
      </form>
    </div>
  );
};

export default CreateProductForm;
