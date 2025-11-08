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

  const { activeRole, buyer } = useAuthStore();

  useEffect(() => {
    if (activeRole !== "buyer" || buyer?.isSeller) {
      router.push("/");
    }
  }, [activeRole, buyer, router]);
  console.log("buyer is ", buyer);

  if (!activeRole || activeRole !== "buyer" || !buyer || buyer.isSeller) return;

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
//   const { activeRole, buyer } = useAuthStore();

//   // ** State
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     if (activeRole !== "buyer" || buyer?.isSeller) {
//       router.push("/");
//     } else {
//       setIsAuthorized(true);
//     }
//   }, [activeRole, buyer, router]);

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
//   const { activeRole, buyer } = useAuthStore();

//   console.log("activeRole is ", activeRole);

//   if (!activeRole || activeRole !== "buyer") return;

//   return <>{children}</>;
// };

// export default OnlyBuyerPage;
