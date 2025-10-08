"use client";

// ** Third Party Imports
import { Dispatch, SetStateAction } from "react";
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
import { useDeliverWork } from "@/features/orders/mutations/use-deliver-work.mutation";
import { deliveredWorkForm, DeliveredWorkForm } from "@/features/orders/schemas/deliver-work.schema";

// ** Define the Zod schema for the form

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  orderId: string;
}

const DeliveryModal = (props: ModalProps) => {
  const { showModal, setShowModal, orderId } = props;

  // ** --- Queries ---

  const { mutate: deliverWork } = useDeliverWork();

  const form = useForm<DeliveredWorkForm>({
    resolver: zodResolver(deliveredWorkForm),
    defaultValues: {
      file: undefined,
      message: undefined,
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: DeliveredWorkForm) => {
    // data.file is now guaranteed to be a File object due to Zod validation
    const file = data.file;

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      const fileData = {
        id: orderId,
        message: data.message,
        file: base64String,
      };
      deliverWork(fileData);

      console.log("Deliver data ", fileData);
      // Here you would send fileData to your backend
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    // The error is fixed here because we pass a File object
    reader.readAsDataURL(file);
  };

  return (
    <BaseModal
      setShowModal={() => setShowModal(false)}
      showModal={showModal}
      className="max-w-md p-8"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl w-full mx-auto py-10"
        >
          {/* File input field */}
          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Zip File</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept=".zip"
                    onChange={(event) => onChange(event.target.files?.[0])}
                  />
                </FormControl>
                <FormDescription>
                  Please upload your delivered work in a zip file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message textarea field */}
          <FormField
            control={form.control}
            name="message"
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

export default DeliveryModal;
