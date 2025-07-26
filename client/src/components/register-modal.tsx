"use client";

// ** Third Party Imports
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ** Components
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

// ** Validations
import {
  RegisterFormField,
  registerValidation,
} from "@/api/auth/schemas/register.schema";
import Image from "next/image";
import { XCircle } from "lucide-react";

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<number>>;
}

const RegisterModal = (props: ModalProps) => {
  // ** --- Props ---
  const { showModal, setShowModal } = props;

  // ** --- States ---
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<RegisterFormField>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "", // Initialize profilePicture as undefined
    },
    mode: "onSubmit", // Validate on submit
  });

  return (
    <BaseModal
      setShowModal={() => setShowModal(-1)}
      showModal={showModal}
      className="max-w-md p-8"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl w-full mx-auto py-10"
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

          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    id="profile-picture-input" // Added an ID for direct access
                    type="file"
                    accept="image/*" // Accept only image files
                    onChange={handleFileChange}
                    // We don't spread {...field} directly here because we're manually handling the file input
                  />
                </FormControl>
                <FormMessage />
                {imagePreview && (
                  // <div className="mt-4">
                  //   <p className="text-sm text-gray-500">Image Preview:</p>
                  //   <Image
                  //     src={imagePreview}
                  //     alt="Profile Preview"
                  //     width={100}
                  //     height={100}
                  //     className="mt-2 rounded-md object-cover"
                  //   />
                  // </div>
                  <div className="mt-4 relative w-[100px] h-[100px]">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <Image
                      src={imagePreview}
                      alt="Profile Preview"
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <h1
        className="text-center cursor-pointer underline"
        onClick={() => setShowModal(0)}
      >
        Already have an account?
      </h1>

      {/* Toaster from sonner. Ideally at the root of your application */}
    </BaseModal>
  );

  // ** Functions

  async function onSubmit(values: RegisterFormField) {
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

  // Function to handle file input change
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("profilePicture", base64String); // Set the base64 string to the form field
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      form.setValue("profilePicture", "");
    }
  }

  // Function to handle clearing the image
  function handleClearImage() {
    setImagePreview(null);
    form.setValue("profilePicture", "");

    // ** IMPORTANT: Clear the file input's value directly
    const fileInput = document.getElementById(
      "profile-picture-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // This clears the visually displayed file name
    }
  }
};

export default RegisterModal;
