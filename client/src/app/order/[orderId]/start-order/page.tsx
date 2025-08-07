"use client";
import { useStartOrder } from "@/api/orders";
import { Button } from "@/components/ui/button";
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
import { startOrderForm, StartOrderForm } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  // extract the order id
  const { orderId } = useParams<{ orderId: string }>();

  // ** --- Queries ---

  // ** --- Mutations ---
  const { mutate: startOrder } = useStartOrder();

  const form = useForm<StartOrderForm>({
    resolver: zodResolver(startOrderForm),
    defaultValues: {
      requirement: undefined,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (orderId) form.reset({ requirement: undefined, id: orderId });
  }, [orderId]);

  return (
    <div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit((data) => createSeller(data))}
          onSubmit={form.handleSubmit((data) => startOrder(data))}
          className="space-y-8 p-4"
        >
          <FormField
            control={form.control}
            name="requirement"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    className="resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Any information you would like the seller to know ?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-8">
            Start Order
          </Button>
        </form>
      </Form>
    </div>
  );

  function onStartOrder() {
    // todo - we will update the order
  }
};

export default page;
