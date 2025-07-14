"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BaseModal } from "@/components/base-modal";

// Import toast from sonner
import { toast } from "sonner";
import { Toaster } from "sonner"; // Typically in layout.tsx or _app.tsx
import { cn } from "@/lib/utils";

// Define your Zod schema with cross-field validation for passwords
const formSchema = z
  .object({
    username: z.string().min(1, "Username is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm Password is required."),
  })
  .superRefine((data, ctx) => {
    // Custom validation for password and confirmPassword
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"], // This ensures the error message appears under confirmPassword
      });
    }
  });

export default function MyForm() {
  // No need for useToast hook from shadcn/ui when using sonner

  // Define your default values
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    mode: "onSubmit", // Validate on submit
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Form values:", values);
      // Simulate an API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Failed to register.");
      // }

      toast.success("Registration Successful!", {
        description: "Your account has been created.",
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error("Registration Failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <BaseModal
      showModal={true} // Set to true to display the modal for testing
      className="max-w-md p-8"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    // className={cn("outline-1")}
                    // className=" bg-red-500"
                    placeholder="Enter your username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {/* FormMessage will automatically display the superRefine error */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* Toaster from sonner. Ideally at the root of your application */}
      <Toaster />
    </BaseModal>
  );
}
