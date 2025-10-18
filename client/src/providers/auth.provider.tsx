"use client";
import { useAuthUser } from "@/features/auth/queries/use-auth-user.query";
import { useCurrentBuyer } from "@/features/buyers/queries/use-current-buyer.query";
import { useCurrentSeller } from "@/features/sellers/queries/use-current-seller.query";
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
