"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ---
// 1. Zod Schema Definition
// ---

export const TagSchema = z.object({
  title: z.string().min(1, "Tag is required"),
});

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  basicTitle: z.string().min(1, { message: "Basic title is required." }),
  basicDescription: z.string().min(1, {
    message: "Basic description is required.",
  }),
  category: z.string().min(1, { message: "Category is required." }),
  subCategories: z.array(z.string()).optional(),
  expectedDelivery: z
    .string()
    .min(1, { message: "Delivery time is required." }),
  coverImage: z.string().url({ message: "Must be a valid URL." }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number." }),
  tags: z.array(TagSchema).optional(),
});
// ---
// 2. Form Component
// ---

export default function GigForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      basicTitle: "",
      basicDescription: "",
      category: "",
      subCategories: [],
      expectedDelivery: "",
      coverImage: "",
      price: 0,
      tags: [{ title: "newTagTitle" }],
    },
  });

  // Use useFieldArray to manage the dynamic 'tags' list
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const [inputSubCategory, setInputSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const handleKeyDownTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === " ") {
      e.preventDefault();
      const newTagTitle = e.currentTarget.value.trim();
      if (newTagTitle) {
        // Append a new object to the 'tags' array
        append({ title: newTagTitle });
        e.currentTarget.value = ""; // Clear the input
      }
    }
  };

  const handleKeyDownSubCategories = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "," || e.key === " ") {
      e.preventDefault();
      const newSubCategory = inputSubCategory.trim();
      if (newSubCategory && !subCategories.includes(newSubCategory)) {
        setSubCategories([...subCategories, newSubCategory]);
        setInputSubCategory("");
      }
    }
  };

  const removeSubCategory = (subCategoryToRemove: string) => {
    setSubCategories(
      subCategories.filter((sub) => sub !== subCategoryToRemove)
    );
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                A high-quality image URL for your gig's cover.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subcategories Field (Updated) */}
        <FormItem>
          <FormLabel>Subcategories</FormLabel>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((sub, index) => (
              <Badge key={index} className="flex items-center gap-1">
                {sub}
                <button
                  type="button"
                  onClick={() => removeSubCategory(sub)}
                  className="p-1 rounded-full hover:bg-white/20"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
          <FormControl>
            <Input
              placeholder="e.g. Logo Design, Branding"
              value={inputSubCategory}
              onChange={(e) => setInputSubCategory(e.target.value)}
              onKeyDown={handleKeyDownSubCategories}
            />
          </FormControl>
          <FormDescription>
            Press comma or space to add a subcategory.
          </FormDescription>
          <FormMessage />
        </FormItem>

        {/* --- Tags Field (Updated to use useFieldArray) --- */}
        <div>
          <FormLabel>Tags</FormLabel>
          <div className="flex flex-wrap gap-2 py-2">
            {fields.map((field, index) => (
              <Badge key={field.id} className="flex items-center gap-1">
                {field.title}
                <button
                  type="button"
                  onClick={() => remove(index)}
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
          <FormDescription>Press comma or space to add a tag.</FormDescription>
          {form.formState.errors.tags && (
            <FormMessage>{form.formState.errors.tags.message}</FormMessage>
          )}
        </div>
        <Button type="submit">Create Gig</Button>
      </form>
    </Form>
  );
}
