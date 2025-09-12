"use client";
import { useBuyerById } from "@/api/buyers";
import { useParams } from "next/navigation";

const page = () => {
  //   ** Params
  const params = useParams<{ id: string }>();

  // ** Queries
  const {
    data: seller,
    isLoading,
    error,
  } = useBuyerById({
    id: params.id,
  });
  console.log("buyer is ", seller);

  return (

      <div>this is buyer profile page</div>
  );
};

export default page;
