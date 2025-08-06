import { useParams } from "next/navigation";

const page = () => {
  // extract the order id
  const { orderId } = useParams<{ orderId: string }>();

  // ** --- Queries ---

  return <div>this is order start page</div>;

  function onStartOrder() {
    // todo - we will update the order
  }
};

export default page;
