"use client";

// ** Third Party Imports
import { Dispatch, SetStateAction } from "react";
import { BaseModal } from "@/components/base-modal";
import { useGetGigBySellerId } from "@/api/gigs";
import { useAuthStore } from "@/store/use-auth.store";
import { CreateMessageForm } from "@/schemas";
import { Control, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  control: Control<CreateMessageForm>;
  setValue: UseFormSetValue<CreateMessageForm>;
  parentFormId: string;
}

// send props from conversationId page
// fetch all gigs of this uer
// add the form select field for gig

const SendOfferModal = (props: ModalProps) => {
  // ** --- Props ---
  const { showModal, setShowModal, control, setValue, parentFormId } = props;

  // ** --- Store ---

  const { authUser } = useAuthStore();

  // ** --- Queries ---
  const { data: gigs, isLoading: isLoadingGigs } = useGetGigBySellerId(
    authUser?.id
  );

  if (isLoadingGigs) return;

  // console.log("gigs of user are ", gigs);

  return (
    <BaseModal
      setShowModal={setShowModal}
      showModal={showModal}
      className="max-w-md p-8"
    >
      <FormField
        control={control}
        name="offer.gigTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gig Title</FormLabel>
            <Select
              // onValueChange={(value) => handleGigSelect(value)}
              // value={field.value}
              // disabled={isLoadingGigs}

              // {...field}
              // // Then, within onValueChange, call your custom handler and field.onChange
              // onValueChange={(value) => {
              //   handleGigSelect(value);
              //   field.onChange(value); // This is crucial: update React Hook Form's internal state
              // }}
              // value={field.value || ""} // Ensure a controlled value, even if empty
              // disabled={isLoadingGigs}

              {...field}
              onValueChange={(value) => {
                // console.log("value is ", value);
                handleGigSelect(value);
                field.onChange(value);
              }}
              value={field.value || ""}
              disabled={isLoadingGigs}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a gig" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {!!gigs && gigs.length > 0 ? (
                  gigs.map((gig) => (
                    // <SelectItem key={gig.id} value={gig.id}>
                    <SelectItem key={gig.id} value={gig.title}>
                      <div className="flex  justify-between gap-x-[10px]">
                        <div className="w-[100px] h-[50px]">
                          <img
                            className="object-cover object-center w-full h-full"
                            src={gig.coverImage}
                            // width={100}
                            alt="gig"
                          />
                        </div>
                        <p>{gig.title}</p>
                      </div>

                      {/* {gig.title} */}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-gigs" disabled>
                    No gigs available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price */}
      <FormField
        control={control}
        name="offer.price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Offer price"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Description */}
      <FormField
        control={control}
        name="offer.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offer Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe your offer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="offer.deliveryInDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Devliery In Days</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Delivery in days"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        form={parentFormId}
        onClick={() => setShowModal(false)}
      >
        Send Offer
      </Button>

      {/* This is base modal */}
    </BaseModal>
  );

  // function handleGigSelect(gigId: string) {
  function handleGigSelect(gigTitle: string) {
    // const selectedGig = gigs?.find((gig) => gig.id === gigId);
    const selectedGig = gigs?.find((gig) => gig.title === gigTitle);

    // console.log("########## ", selectedGig?.title);
    // console.log("########## ", selectedGig);

    if (selectedGig) {
      setValue("offer.gigId", selectedGig.id);
      setValue("offer.gigTitle", selectedGig.title);
      // setValue("offer.price", selectedGig.price);
      // setValue("offer.deliveryInDays", parseInt(selectedGig.expectedDelivery)); // Assuming expectedDelivery is a string like "5 days" or just "5"
      setValue("hasOffer", true);
      setValue("body", "");
    }
  }
};

export default SendOfferModal;
