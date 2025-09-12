"use client";
import { useAuthUser } from "@/api/auth";
import { useCurrentBuyer } from "@/api/buyers";
import { useCurrentSeller } from "@/api/sellers";
import { ReactNode, useRef } from "react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const renderCount = useRef(1);

  useAuthUser();
  useCurrentSeller();
  useCurrentBuyer();

  // console.log("auth provider render count is ", renderCount.current);
  renderCount.current += 1;

  return <div>{children}</div>;
};

export default AuthProvider;
