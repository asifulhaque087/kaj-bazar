"use client";

// ** Third Party Imports
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { loginForm, LoginForm } from "@/schemas";
import { useLogin } from "@/api/auth";

// ** Validations

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<number>>;
}

// let renderCount = 1;

const LoginModal = (props: ModalProps) => {
  const { showModal, setShowModal } = props;
  const renderCount = useRef(1);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      // username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit", // Validate on submit
  });

  // console.log("this is first @#@#@#");
  const { mutate: login } = useLogin({
    reset: form.reset,
    setError: form.setError,
    setShowModal,
  });

  // console.log("Login Modal render count is ", renderCount.current);
  renderCount.current += 1;

  return (
    <BaseModal
      setShowModal={() => setShowModal(-1)}
      showModal={showModal}
      className="max-w-md p-8"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => login(data))}
          className="space-y-8 max-w-3xl w-full mx-auto py-10"
        >
          {/* <FormField
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
          /> */}

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

          {/* <FormField
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
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <Button type="submit">Submit</Button> */}

          <button
            type="submit"
            className={`rounded-[8px] bg-[#CDC0A8] px-[20px] py-[6px] font-roboto text-sm text-[#3E3F47] whitespace-nowrap capitalize`}
          >
            Login
          </button>
        </form>
      </Form>

      <h1
        className="text-center cursor-pointer underline"
        onClick={() => setShowModal(1)}
      >
        Create a new account
      </h1>

      {/* Toaster from sonner. Ideally at the root of your application */}
    </BaseModal>
  );

  // ** Functions

  // async function onSubmit(values: LoginFormField) {
  //   login;
  // }
};

export default LoginModal;
