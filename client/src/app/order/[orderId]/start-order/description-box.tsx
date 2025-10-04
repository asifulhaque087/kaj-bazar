import { useStartOrder } from "@/api/orders";
import { startOrderForm, StartOrderForm } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DescriptionBox = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { mutate: startOrder, isPending, isSuccess } = useStartOrder();

  const form = useForm<StartOrderForm>({
    resolver: zodResolver(startOrderForm),
    defaultValues: {
      requirement: "",
      id: orderId as string,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (orderId) {
      form.reset({ requirement: "", id: orderId as string });
    }
  }, [orderId, form]);

  //   const onSubmit = (data: StartOrderForm) => {
  //     startOrder(data);
  //   };

  return (
    <div className="p-[24px] rounded-[8px] bg-[#FEFEFF] w-full flex flex-col gap-y-[12px]">
      <h1 className="font-roboto font-medium text-[20px] text-[#0E0F19]">
        Any information you would like the seller to know ?
      </h1>
      <p className="font-roboto font-normal text-[14px] text-[#3E3F47]">
        Click the button to start the order
      </p>
      <form
        onSubmit={form.handleSubmit((data) => startOrder(data))}
        className="flex flex-col gap-y-[12px]"
      >
        <textarea
          className="w-full outline-none border-none rounded-[5px] bg-[#F7F7FA] min-h-[364px] p-[16px]  font-roboto font-normal text-[14px] text-[#3E3F47] placeholder:font-roboto placeholder:font-normal placeholder:text-[14px] placeholder:text-[#3E3F47]"
          placeholder="Write a brief description...."
        />
        <button
          type="submit"
          className="border-none outline-none px-[16px] py-[18px] rounded-[4px] bg-[#616BA4] text-[#F7F7FA] font-roboto font-medium text-[14px] capitalize w-[155px] cursor-pointer"
        >
          {isPending ? "start ordering..." : "start order"}
        </button>
      </form>
    </div>
  );
};

export default DescriptionBox;
