"use client";
import { useAuthUser } from "@/api/auth";
import { useCurrentBuyer } from "@/api/buyers";
import { ReactNode } from "react";

const AuthProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { isLoading: isUserLoading, data: user } = useAuthUser();
  const { isLoading: isBuyerLoading, data: buyer } = useCurrentBuyer(user?.id);

  // useEffect(() => {
  //   if (user) setAuthUser(user);
  //   if (buyer) setBuyer(buyer);
  // }, [user, setAuthUser, buyer, setBuyer]);

  // if (isUserLoading || isBuyerLoading) return <div>Loading...</div>;

  return <div>{children}</div>;
};

export default AuthProvider;
