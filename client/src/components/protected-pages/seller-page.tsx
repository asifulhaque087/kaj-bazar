"use client";
import { useAuthStore } from "@/store/use-auth.store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const SellerPage = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const { role } = useAuthStore();
  console.log("role is ", role);

  useEffect(() => {
    if (role !== "seller") {
      router.push("/");
    }
  }, [role, router]);

  if (!role || role !== "seller") return;

  return <div>{children}</div>;
};

export default SellerPage;
