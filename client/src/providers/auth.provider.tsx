"use client";
import { useAuthUser } from "@/api/auth";
import { useCurrentBuyer } from "@/api/buyers";
import { ReactNode } from "react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { data: user } = useAuthUser();
  useCurrentBuyer(user?.id);

  return <div>{children}</div>;
};

export default AuthProvider;
