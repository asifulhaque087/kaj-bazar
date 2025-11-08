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
  const { activeRole } = useAuthStore();
  console.log("activeRole is ", activeRole);

  useEffect(() => {
    if (activeRole !== "seller") {
      router.push("/");
    }
  }, [activeRole, router]);

  if (!activeRole || activeRole !== "seller") return;

  return <div>{children}</div>;
};

export default SellerPage;
