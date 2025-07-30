"use client";
import { useAuthUser } from "@/api/auth";
import { useCurrentBuyer } from "@/api/buyers";
import { useAuthStore } from "@/store/use-auth.store";
import React, { useEffect } from "react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoading: isUserLoading, data: user } = useAuthUser();
  const { isLoading: isBuyerLoading, data: buyer } = useCurrentBuyer(user?.id);

  const { setAuthUser, setBuyer } = useAuthStore();

  useEffect(() => {
    if (user) setAuthUser(user);
    if (buyer) setBuyer(buyer);
  }, [user, setAuthUser, buyer, setBuyer]);

  // if (isUserLoading || isBuyerLoading) return <div>Loading...</div>;

  return <div>{children}</div>;
};

export default AuthProvider;
