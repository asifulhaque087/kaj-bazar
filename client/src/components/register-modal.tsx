"use client";

// ** Third Party Imports
import { Dispatch, SetStateAction } from "react";
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
} from "@/validations/register.validation";

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<number>>;
}

const RegisterModal = (props: ModalProps) => {
  const { showModal, setShowModal } = props;

  const form = useForm<RegisterFormField>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
};

export default RegisterModal;
