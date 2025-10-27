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
import { useAuthStore } from "@/store/use-auth.store";
import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import { useBrowser } from "@/hooks/use-browser.hook";
import Navigation from "@/components/Navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetGigById } from "@/features/gig/queries/use-gig.query";
import { useUpdateGig } from "@/features/gig/mutations/use-update-gig.mutation";
import { updateGigDefaultForm } from "@/features/gig/default-form-values/gig.form";
import {
  updateGigForm,
  UpdateGigForm,
} from "@/features/gig/schemas/gig.schema";

export default function GigForm() {
  // ** --- States ---
  // const [showDevTool, setShowDevTool] = useState(false);

  // ** --- store ---
  const { authUser } = useAuthStore();

  const params = useParams<{ id: string }>();

  // ** --- queries ---
  const {
    data: gig,
    isLoading,
    error,
  } = useGetGigById({
    id: params.id,
  });

  const form = useForm<UpdateGigForm>({
    resolver: zodResolver(updateGigForm) as Resolver<UpdateGigForm>,
    defaultValues: updateGigDefaultForm(null),
    mode: "onChange",
  });

  useEffect(() => {
    if (gig) {
      // Only reset if authUser exists
      form.reset(updateGigDefaultForm(gig));
    }
  }, [gig, form]);

  // ** --- mutations ---

  const { isPending, mutate: updateGig } = useUpdateGig({
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

  // const watchedImages = form.watch("images");
  // const watchedSubCategories = form.watch("subCategories");

  const isBrowser = useBrowser();

  const imagePreview = form.watch("coverImage");

  if (!isBrowser) return;

  // console.log("wathc images are ", watchedImages);

  return (
    <Container>
      {/* header */}
      <Navigation />

      {/* Breadcum */}
      <nav
        className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                href="/gigs"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Gigs
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Edit
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => updateGig(data))}
          className="grid grid-cols-12 gap-[24px] mt-[24px]"
        >
          <div className="col-span-12 xl:col-span-6">
            <Card className="px-[24px] shadow-lg h-full flex flex-col justify-center">
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
                    <FormDescription>
                      The main title of your gig.
                    </FormDescription>
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
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <Card className="px-[24px] shadow-lg h-full flex flex-col justify-center">
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

              {/* Expected Delivery Field */}
              <FormField
                control={form.control}
                name="expectedDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Delivery</FormLabel>
                    {/* <Select onValueChange={field.onChange} defaultValue={field.value}> */}
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      {/* <Select onValueChange={field.onChange} value={"1 day"}> */}
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a delivery time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1 day">1 day</SelectItem>

                        <SelectItem value="4 Days Delivery">
                          4 Days Delivery
                        </SelectItem>

                        <SelectItem value="3 days">3 days</SelectItem>
                        <SelectItem value="7 days">7 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <Card className="px-[24px] shadow-lg h-full flex flex-col justify-center">
              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl className="w-full">
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
              {/* image field */}

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        id="cover-image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                    {imagePreview && (
                      <div className="mt-4 relative w-[100px] h-[100px]">
                        {/* <p className="text-sm text-gray-500 mb-2">Image Preview:</p> */}
                        <img src={imagePreview} alt="gig" />
                        <Button
                          type="button"
                          onClick={handleClearImage}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 h-auto w-auto cursor-pointer"
                          size="icon"
                        >
                          <XCircle className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <Card className="px-[24px] shadow-lg h-full flex flex-col justify-center">
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
                <FormDescription className="mt-[10px]">
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
                <FormDescription className="mt-[10px]">
                  Press comma or enter to add a tag.
                </FormDescription>
                {form.formState.errors.tags && (
                  <FormMessage>
                    {form.formState.errors.tags.message}
                  </FormMessage>
                )}
              </div>
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-12">
            <Card className="px-[24px] shadow-lg h-full">
              <Button
                disabled={isPending}
                type="submit"
                className="cursor-pointer bg-[#6392D8] text-white py-[20px]"
              >
                {isPending ? "Updating..." : "Update Gig"}
              </Button>
            </Card>
          </div>
          {/* <div className="col-span-12 xl:col-span-12">
            <Button type="submit">Create Gig</Button>
          </div> */}
        </form>
      </Form>
      {/* <DevTool control={form.control} /> */}
    </Container>
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

  // Function to handle file input change
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("coverImage", base64String); // Set the base64 string to the form field
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("coverImage", "");
    }
  }

  function handleClearImage() {
    form.setValue("coverImage", "");

    const fileInput = document.getElementById(
      "cover-image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }
}
