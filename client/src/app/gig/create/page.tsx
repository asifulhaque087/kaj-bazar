"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Resolver } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import { X, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createGigForm, CreateGigForm } from "@/schemas";
import { createGigDefaultForm } from "@/forms";
import { useAuthStore } from "@/store/use-auth.store";
import Image from "next/image";
import { useCreateGig } from "@/api/gigs/gig.mutations";

export default function GigForm() {
  // ** --- States ---
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ** --- store ---
  const { authUser } = useAuthStore();

  const form = useForm<CreateGigForm>({
    resolver: zodResolver(createGigForm) as Resolver<CreateGigForm>,
    defaultValues: createGigDefaultForm(null),
    mode: "onChange",
  });

  // const form = useForm<CreateGigForm>({
  //   resolver: zodResolver(createGigForm),
  //   defaultValues: createGigDefaultForm(null),
  //   mode: "onChange",
  // });

  useEffect(() => {
    if (authUser) {
      // Only reset if authUser exists
      form.reset(createGigDefaultForm(authUser));
    }
  }, [authUser, form]);

  // ** --- mutations ---

  const { mutate: createGig } = useCreateGig({
    reset: form.reset,
    setError: form.setError,
  });

  // Use useFieldArray to manage the dynamic 'subCategories' list
  const {
    fields: subCategoryFields,
    append: appendSubCategory,
    remove: removeSubCategory,
  } = useFieldArray({
    control: form.control,
    name: "subCategories",
  });

  // Use useFieldArray to manage the dynamic 'tags' list
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  // const [inputSubCategory, setInputSubCategory] = useState("");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => createGig(data))}
        className="space-y-8 p-6 border rounded-lg"
      >
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="I will create a stunning logo..."
                  {...field}
                />
              </FormControl>
              <FormDescription>The main title of your gig.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell customers about your service..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Basic Title Field */}
        <FormField
          control={form.control}
          name="basicTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic Package Title</FormLabel>
              <FormControl>
                <Input placeholder="Basic Logo Design" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Basic Description Field */}
        <FormField
          control={form.control}
          name="basicDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic Package Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Includes one concept and two revisions."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Graphics & Design">
                    Graphics & Design
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Writing & Translation">
                    Writing & Translation
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expected Delivery Field */}
        <FormField
          control={form.control}
          name="expectedDelivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Delivery</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a delivery time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="7 days">7 days</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Image Field */}
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  id="cover-image-input" // Added an ID for direct access
                  type="file"
                  accept="image/*" // Accept only image files
                  onChange={handleFileChange}
                  // We don't spread {...field} directly here because we're manually handling the file input
                />
              </FormControl>
              <FormMessage />
              {imagePreview && (
                <div className="mt-4 relative w-[100px] h-[100px]">
                  <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                  <Image
                    src={imagePreview}
                    alt="Cover Image Preview"
                    layout="fill" // Use fill for better image handling within a container
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <Button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 h-auto w-auto"
                    size="icon"
                  >
                    <XCircle className="h-4 w-4 text-white" />
                  </Button>
                </div>
              )}
            </FormItem>
          )}
        />

        {/* Subcategories Field */}
        <div>
          <FormLabel>Subcategories</FormLabel>
          <div className="flex flex-wrap gap-2 py-2">
            {subCategoryFields.map((field, index) => (
              <Badge key={field.id} className="flex items-center gap-1">
                {field.title}
                <button
                  type="button"
                  onClick={() => removeSubCategory(index)}
                  className="p-1 rounded-full hover:bg-white/20"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="e.g. Logo Design, Branding"
            onKeyDown={handleKeyDownSubCategories}
          />
          <FormDescription>
            Press comma or enter to add a subcategory.
          </FormDescription>
          {form.formState.errors.subCategories && (
            <FormMessage>
              {form.formState.errors.subCategories.message}
            </FormMessage>
          )}
        </div>

        {/* --- Tags Field (Updated to use useFieldArray) --- */}
        <div>
          <FormLabel>Tags</FormLabel>
          <div className="flex flex-wrap gap-2 py-2">
            {tagFields.map((field, index) => (
              <Badge key={field.id} className="flex items-center gap-1">
                {field.title}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="p-1 rounded-full hover:bg-white/20"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="e.g. logo design, minimalist"
            onKeyDown={handleKeyDownTags}
          />
          <FormDescription>Press comma or enter to add a tag.</FormDescription>
          {form.formState.errors.tags && (
            <FormMessage>{form.formState.errors.tags.message}</FormMessage>
          )}
        </div>
        <Button type="submit">Create Gig</Button>
      </form>
    </Form>
  );

  function handleKeyDownTags(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTagTitle = e.currentTarget.value.trim();
      if (newTagTitle) {
        appendTag({ title: newTagTitle });
        e.currentTarget.value = "";
      }
    }
  }

  function handleKeyDownSubCategories(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newSubCategory = e.currentTarget.value.trim();
      if (newSubCategory) {
        // Append a new object to the 'subCategories' array
        appendSubCategory({ title: newSubCategory });
        e.currentTarget.value = "";
      }
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("coverImage", base64String); // Set the base64 string to the form field
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      form.setValue("coverImage", "");
    }
  }

  // Function to handle clearing the image
  function handleClearImage() {
    setImagePreview(null);
    form.setValue("coverImage", "");

    // ** IMPORTANT: Clear the file input's value directly
    const fileInput = document.getElementById(
      "cover-image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // This clears the visually displayed file name
    }
  }
}
