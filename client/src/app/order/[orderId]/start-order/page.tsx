// "use client";
// import { useStartOrder } from "@/api/orders";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { startOrderForm, StartOrderForm } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams } from "next/navigation";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";

// const page = () => {
//   // extract the order id
//   const { orderId } = useParams<{ orderId: string }>();

//   // ** --- Queries ---

//   // ** --- Mutations ---
//   const { mutate: startOrder } = useStartOrder();

//   const form = useForm<StartOrderForm>({
//     resolver: zodResolver(startOrderForm),
//     defaultValues: {
//       requirement: undefined,
//     },
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (orderId) form.reset({ requirement: undefined, id: orderId });
//   }, [orderId]);

//   return (
//     <div>
//       <Form {...form}>
//         <form
//           // onSubmit={form.handleSubmit((data) => createSeller(data))}
//           onSubmit={form.handleSubmit((data) => startOrder(data))}
//           className="space-y-8 p-4"
//         >
//           <FormField
//             control={form.control}
//             name="requirement"
//             render={({ field }) => (
//               <FormItem className="col-span-1 md:col-span-2">
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Description..."
//                     className="resize-y min-h-[100px]"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Any information you would like the seller to know ?
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="mt-8">
//             Start Order
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );

//   function onStartOrder() {
//     // todo - we will update the order
//   }
// };

// export default page;

// ============== new design

"use client";
import DescriptionBox from "@/features/orders/components/description-box";
import Welcome from "@/features/orders/components/welcome-start-order";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStartOrder } from "@/features/orders/mutations/use-start-order.mutation";
import { startOrderForm, StartOrderForm } from "@/features/orders/schemas/start-order.schema";

const Page = () => {
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

  const onSubmit = (data: StartOrderForm) => {
    startOrder(data);
  };

  return (
    <>
      <Container className="pt-[28px]">
        <Welcome />
      </Container>

      <Container className="pt-[28px]">
        <DescriptionBox />
      </Container>
    </>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-xl shadow-lg dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Submit Your Requirements
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
            This is the final step to start your order. Provide all the
            necessary details to help the seller get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="text-center flex flex-col items-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CircleCheck className="h-16 w-16 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-50">
                Requirements Submitted!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Your order has been started. The seller will begin working
                shortly.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700 dark:text-gray-300">
                        Detailed Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Example: 'I need a logo with a minimalist design, using a color palette of blue and gold. The name of the company is InnovateTech...'"
                          className="min-h-[150px] resize-y bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 dark:text-gray-400">
                        Share any information, files, or specific instructions
                        for the seller.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                  disabled={isPending}
                >
                  {isPending? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Start Order"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
