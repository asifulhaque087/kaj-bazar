"use client";

// ** Third Party Imports
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Components
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
import { BaseModal } from "@/components/base-modal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Order, sellerReviewBuyerForm, SellerReviewBuyerForm } from "@/schemas";
import { sellerReviewBuyerDefaultForm } from "@/features/reviews/default-form-values/review.form";
import { useSellerReviewBuyer } from "@/features/reviews/mutations/use-seller-review-buyer.mutation";

// ** Define the Zod schema for the form

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  order: Order;
}

const SellerReviewBuyerModal = (props: ModalProps) => {
  const { showModal, setShowModal, order } = props;

  // ** --- Mutations ---

  const { mutate: sellerReviewBuyer } = useSellerReviewBuyer();

  const form = useForm<SellerReviewBuyerForm>({
    resolver: zodResolver(sellerReviewBuyerForm),
    defaultValues: sellerReviewBuyerDefaultForm(null),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (order) {
      form.reset(sellerReviewBuyerDefaultForm(order));
    }
  }, [order]);

  return (
    <BaseModal
      setShowModal={() => setShowModal(false)}
      showModal={showModal}
      className="max-w-md p-8"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => sellerReviewBuyer(data))}
          className="space-y-8 max-w-3xl w-full mx-auto py-10"
        >
          {/* ratings */}
          <FormField
            control={form.control}
            name="ratings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ratings</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rating"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message textarea field */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    className="resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Any information you would like the buyer to know.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </BaseModal>
  );
};

export default SellerReviewBuyerModal;
