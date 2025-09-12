"use client";
import { useAuthStore } from "@/store/use-auth.store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const OnlyBuyerPage = (props: Props) => {
  // ** Props
  const { children } = props;

  // ** Router
  const router = useRouter();

  // ** Store

  const { role, buyer } = useAuthStore();

  useEffect(() => {
    if (role !== "buyer" || buyer?.isSeller) {
      router.push("/");
    }
  }, [role, buyer, router]);
  console.log("buyer is ", buyer);

  if (!role || role !== "buyer" || !buyer || buyer.isSeller) return;

  return <div>{children}</div>;
};

export default OnlyBuyerPage;

// ====================================

// "use client";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";

// interface Props {
//   children: ReactNode;
// }

// const OnlyBuyerPage = (props: Props) => {
//   // ** Props
//   const { children } = props;

//   // ** Router
//   const router = useRouter();

//   // ** Store
//   const { role, buyer } = useAuthStore();

//   // ** State
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     if (role !== "buyer" || buyer?.isSeller) {
//       router.push("/");
//     } else {
//       setIsAuthorized(true);
//     }
//   }, [role, buyer, router]);

//   if (!isAuthorized) {
//     return null; // Or show a loading spinner
//   }

//   return <div>{children}</div>;
// };

// export default OnlyBuyerPage;
// "use client";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useRouter } from "next/navigation";
// import { ReactNode } from "react";

// interface Props {
//   children: ReactNode;
// }

// const OnlyBuyerPage = ({ children }: Props) => {
//   const router = useRouter();
//   const { role, buyer } = useAuthStore();

//   console.log("role is ", role);

//   if (!role || role !== "buyer") return;

//   return <>{children}</>;
// };

// export default OnlyBuyerPage;
