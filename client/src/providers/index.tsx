import AuthProvider from "@/providers/auth.provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Toaster />
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </>
  );
};

export default Providers;
