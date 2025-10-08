// "use client";

// // ** Third Party Imports
// import { Dispatch, SetStateAction } from "react";
// import { BaseModal } from "@/components/base-modal";
// import { useGetGigBySellerId } from "@/api/gigs";
// import { useAuthStore } from "@/store/use-auth.store";
// import { CreateMessageForm } from "@/schemas";
// import { Control, UseFormSetValue } from "react-hook-form";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// // ** Component Props
// interface ModalProps {
//   showModal?: boolean;
//   setShowModal: Dispatch<SetStateAction<boolean>>;
//   control: Control<CreateMessageForm>;
//   setValue: UseFormSetValue<CreateMessageForm>;
//   parentFormId: string;
// }

// // send props from conversationId page
// // fetch all gigs of this uer
// // add the form select field for gig

// const SendOfferModal = (props: ModalProps) => {
//   // ** --- Props ---
//   const { showModal, setShowModal, control, setValue, parentFormId } = props;

//   // ** --- Store ---

//   const { authUser } = useAuthStore();

//   // ** --- Queries ---
//   const { data: gigs, isLoading: isLoadingGigs } = useGetGigBySellerId(
//     authUser?.id
//   );

//   if (isLoadingGigs) return;

//   // console.log("gigs of user are ", gigs);

//   return (
//     <BaseModal
//       setShowModal={setShowModal}
//       showModal={showModal}
//       className="max-w-md p-8"
//     >
//       <FormField
//         control={control}
//         name="offer.gigTitle"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Gig Title</FormLabel>
//             <Select
//               // onValueChange={(value) => handleGigSelect(value)}
//               // value={field.value}
//               // disabled={isLoadingGigs}

//               // {...field}
//               // // Then, within onValueChange, call your custom handler and field.onChange
//               // onValueChange={(value) => {
//               //   handleGigSelect(value);
//               //   field.onChange(value); // This is crucial: update React Hook Form's internal state
//               // }}
//               // value={field.value || ""} // Ensure a controlled value, even if empty
//               // disabled={isLoadingGigs}

//               {...field}
//               onValueChange={(value) => {
//                 // console.log("value is ", value);
//                 handleGigSelect(value);
//                 field.onChange(value);
//               }}
//               value={field.value || ""}
//               disabled={isLoadingGigs}
//             >
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a gig" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {!!gigs && gigs.length > 0 ? (
//                   gigs.map((gig) => (
//                     // <SelectItem key={gig.id} value={gig.id}>
//                     <SelectItem key={gig.id} value={gig.title}>
//                       <div className="flex  justify-between gap-x-[10px]">
//                         <div className="w-[100px] h-[50px]">
//                           <img
//                             className="object-cover object-center w-full h-full"
//                             src={gig.coverImage}
//                             // width={100}
//                             alt="gig"
//                           />
//                         </div>
//                         <p>{gig.title}</p>
//                       </div>

//                       {/* {gig.title} */}
//                     </SelectItem>
//                   ))
//                 ) : (
//                   <SelectItem value="no-gigs" disabled>
//                     No gigs available
//                   </SelectItem>
//                 )}
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Price */}
//       <FormField
//         control={control}
//         name="offer.price"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Price</FormLabel>
//             <FormControl>
//               <Input
//                 type="number"
//                 placeholder="Offer price"
//                 {...field}
//                 onChange={(e) => field.onChange(parseFloat(e.target.value))}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       {/* Description */}
//       <FormField
//         control={control}
//         name="offer.description"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Offer Description</FormLabel>
//             <FormControl>
//               <Textarea placeholder="Describe your offer" {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <FormField
//         control={control}
//         name="offer.deliveryInDays"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Devliery In Days</FormLabel>
//             <FormControl>
//               <Input
//                 type="number"
//                 placeholder="Delivery in days"
//                 {...field}
//                 onChange={(e) => field.onChange(parseFloat(e.target.value))}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <Button
//         type="submit"
//         form={parentFormId}
//         onClick={() => setShowModal(false)}
//       >
//         Send Offer
//       </Button>

//       {/* This is base modal */}
//     </BaseModal>
//   );

//   // function handleGigSelect(gigId: string) {
//   function handleGigSelect(gigTitle: string) {
//     // const selectedGig = gigs?.find((gig) => gig.id === gigId);
//     const selectedGig = gigs?.find((gig) => gig.title === gigTitle);

//     // console.log("########## ", selectedGig?.title);
//     // console.log("########## ", selectedGig);

//     if (selectedGig) {
//       setValue("offer.gigId", selectedGig.id);
//       setValue("offer.gigTitle", selectedGig.title);
//       // setValue("offer.price", selectedGig.price);
//       // setValue("offer.deliveryInDays", parseInt(selectedGig.expectedDelivery)); // Assuming expectedDelivery is a string like "5 days" or just "5"
//       setValue("hasOffer", true);
//       setValue("body", "");
//     }
//   }
// };

// export default SendOfferModal;

// ======================================

// "use client";

// // ** Third Party Imports
// import { Dispatch, SetStateAction } from "react";
// import { Control, UseFormSetValue, Controller } from "react-hook-form";
// import { BaseModal } from "@/components/base-modal";
// import { useGetGigBySellerId } from "@/api/gigs";
// import { useAuthStore } from "@/store/use-auth.store";
// import { CreateMessageForm } from "@/schemas";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// // ** Component Props
// interface ModalProps {
//   showModal?: boolean;
//   setShowModal: Dispatch<SetStateAction<boolean>>;
//   control: Control<CreateMessageForm>;
//   setValue: UseFormSetValue<CreateMessageForm>;
//   parentFormId: string;
// }

// // Custom styles for normal HTML elements
// const inputClassName =
//   "px-4 py-2 w-full rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400";
// const textareaClassName =
//   "px-4 py-2 w-full rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400";
// const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
// const formItemClassName = "mb-4";

// const SendOfferModal = (props: ModalProps) => {
//   // ** --- Props ---
//   const { showModal, setShowModal, control, setValue, parentFormId } = props;

//   // ** --- Store ---
//   const { authUser } = useAuthStore();

//   // ** --- Queries ---
//   const { data: gigs, isLoading: isLoadingGigs } = useGetGigBySellerId(
//     authUser?.id
//   );

//   if (isLoadingGigs) return null;

//   // Function to update other form fields when a gig is selected
//   function handleGigSelect(gigTitle: string) {
//     const selectedGig = gigs?.find((gig) => gig.title === gigTitle);

//     if (selectedGig) {
//       setValue("offer.gigId", selectedGig.id);
//       setValue("offer.gigTitle", selectedGig.title);
//       // setValue("offer.price", selectedGig.price); // Keep current values unless you want defaults
//       // setValue("offer.deliveryInDays", parseInt(selectedGig.expectedDelivery)); // Keep current values unless you want defaults
//       setValue("hasOffer", true);
//       setValue("body", "");
//     }
//   }

//   return (
//     <BaseModal
//       setShowModal={setShowModal}
//       showModal={showModal}
//       className="max-w-md p-8"
//     >
//       {/* Gig Title - Using shadcn/ui Select Component with Controller */}
//       <Controller
//         name="offer.gigTitle"
//         control={control}
//         render={({ field }) => (
//           // ADDED w-full here to the container div
//           <div className={`${formItemClassName} w-full`}>
//             <label className={labelClassName}>Gig Title</label>
//             <Select
//               {...field}
//               onValueChange={(value) => {
//                 handleGigSelect(value); // Custom handler to set gigId and other data
//                 field.onChange(value); // RHF update
//               }}
//               value={field.value || ""} // Ensure value is controlled
//               disabled={isLoadingGigs}
//             >
//               <SelectTrigger className="w-full">
//                 {" "}
//                 {/* ADDED w-full here as well for safety */}
//                 <SelectValue placeholder="Select a gig" />
//               </SelectTrigger>
//               <SelectContent>
//                 {!!gigs && gigs.length > 0 ? (
//                   gigs.map((gig) => (
//                     // Storing the gig title in the value to easily look it up later
//                     <SelectItem key={gig.id} value={gig.title}>
//                       {/* Rich content display for the Select Item */}
//                       <div className="flex items-center gap-x-2">
//                         <div className="w-[50px] h-[30px] flex-shrink-0">
//                           <img
//                             className="object-cover object-center w-full h-full rounded"
//                             src={gig.coverImage}
//                             alt={gig.title}
//                           />
//                         </div>
//                         <p className="truncate">{gig.title}</p>
//                       </div>
//                     </SelectItem>
//                   ))
//                 ) : (
//                   <SelectItem value="no-gigs" disabled>
//                     No gigs available
//                   </SelectItem>
//                 )}
//               </SelectContent>
//             </Select>
//             {/* Note: Manual error display would go here if needed */}
//           </div>
//         )}
//       />

//       {/* Price - Using Normal HTML Input with Controller */}
//       <Controller
//         name="offer.price"
//         control={control}
//         render={({ field }) => (
//           <div className={formItemClassName}>
//             <label className={labelClassName}>Price</label>
//             <input
//               type="number"
//               placeholder="Offer price"
//               className={inputClassName}
//               {...field}
//               // Manually handle the change to convert to float
//               onChange={(e) => field.onChange(parseFloat(e.target.value))}
//               value={field.value ?? ""}
//             />
//           </div>
//         )}
//       />

//       {/* Description - Using Normal HTML Textarea with Controller */}
//       <Controller
//         name="offer.description"
//         control={control}
//         render={({ field }) => (
//           <div className={formItemClassName}>
//             <label className={labelClassName}>Offer Description</label>
//             <textarea
//               placeholder="Describe your offer"
//               className={textareaClassName}
//               rows={3}
//               {...field}
//               value={field.value ?? ""}
//             />
//           </div>
//         )}
//       />

//       {/* Delivery In Days - Using Normal HTML Input with Controller */}
//       <Controller
//         name="offer.deliveryInDays"
//         control={control}
//         render={({ field }) => (
//           <div className={formItemClassName}>
//             <label className={labelClassName}>Delivery In Days</label>
//             <input
//               type="number"
//               placeholder="Delivery in days"
//               className={inputClassName}
//               {...field}
//               // Manually handle the change to convert to float
//               onChange={(e) => field.onChange(parseFloat(e.target.value))}
//               value={field.value ?? ""}
//             />
//           </div>
//         )}
//       />

//       {/* Button - Using shadcn/ui Button */}
//       <Button
//         type="submit"
//         form={parentFormId}
//         // onClick={() => setShowModal(false)}
//         className="mt-4 w-full bg-[#616BA4] hover:bg-[#4E5683]"
//       >
//         Send Offer
//       </Button>
//     </BaseModal>
//   );
// };

// export default SendOfferModal;

// ============================================================

import { Dispatch, SetStateAction } from "react";
import {
  Control,
  UseFormSetValue,
  Controller,
  UseFormHandleSubmit,
} from "react-hook-form";
import { BaseModal } from "@/components/base-modal";
import { useAuthStore } from "@/store/use-auth.store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { expectedDeliveryOptions } from "@/constants";
import { CreateMessageForm } from "@/features/chats/schemas/create-message.schema";
import { useGetGigBySellerId } from "@/features/gigs/queries/use-seller-gigs.query";

// ** Component Props
interface ModalProps {
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  control: Control<CreateMessageForm>;
  setValue: UseFormSetValue<CreateMessageForm>;
  handleSubmit: UseFormHandleSubmit<CreateMessageForm>; // 👈 added
  onSubmit: (data: CreateMessageForm) => void; // 👈 added
}

const inputClassName =
  "px-4 py-2 w-full rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400";
const textareaClassName =
  "px-4 py-2 w-full rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400";
const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
const formItemClassName = "mb-4";

const SendOfferModal = (props: ModalProps) => {
  const { showModal, setShowModal, control, setValue, handleSubmit, onSubmit } =
    props;

  const { authUser } = useAuthStore();
  const { data: gigs, isLoading: isLoadingGigs } = useGetGigBySellerId(
    authUser?.id
  );

  if (isLoadingGigs) return null;

  function handleGigSelect(gigTitle: string) {
    const selectedGig = gigs?.find((gig) => gig.title === gigTitle);

    if (selectedGig) {
      setValue("offer.gigId", selectedGig.id);
      setValue("offer.gigTitle", selectedGig.title);
      setValue("hasOffer", true);
      setValue("body", ""); // clear text input if offer is chosen
    }
  }

  return (
    <BaseModal
      setShowModal={setShowModal}
      showModal={showModal}
      className="max-w-md p-8"
    >
      {/* ✅ Wrap everything in a form */}
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data); // parent submit
          setShowModal(false); // close modal
        })}
      >
        {/* Gig Title */}
        <Controller
          name="offer.gigTitle"
          control={control}
          render={({ field }) => (
            <div className={`${formItemClassName} w-full`}>
              <label className={labelClassName}>Gig</label>
              <Select
                {...field}
                onValueChange={(value) => {
                  handleGigSelect(value);
                  field.onChange(value);
                }}
                value={field.value || ""}
                disabled={isLoadingGigs}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a gig" />
                </SelectTrigger>
                <SelectContent>
                  {!!gigs && gigs.length > 0 ? (
                    gigs.map((gig) => (
                      <SelectItem key={gig.id} value={gig.title}>
                        <div className="flex items-center gap-x-2">
                          <div className="w-[50px] h-[30px] flex-shrink-0">
                            <img
                              className="object-cover object-center w-full h-full rounded"
                              src={gig.coverImage}
                              alt={gig.title}
                            />
                          </div>
                          <p className="truncate">{gig.title}</p>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-gigs" disabled>
                      No gigs available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* Price */}
        <Controller
          name="offer.price"
          control={control}
          render={({ field }) => (
            <div className={formItemClassName}>
              <label className={labelClassName}>Price</label>
              <input
                type="number"
                placeholder="Offer price"
                className={inputClassName}
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value ?? ""}
              />
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="offer.description"
          control={control}
          render={({ field }) => (
            <div className={formItemClassName}>
              <label className={labelClassName}>Offer Description</label>
              <textarea
                placeholder="Describe your offer"
                className={textareaClassName}
                rows={3}
                {...field}
                value={field.value ?? ""}
              />
            </div>
          )}
        />

        {/* Delivery In Days */}
        {/* <Controller
          name="offer.deliveryInDays"
          control={control}
          render={({ field }) => (
            <div className={formItemClassName}>
              <label className={labelClassName}>Delivery In Days</label>
              <input
                type="number"
                placeholder="Delivery in days"
                className={inputClassName}
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                value={field.value ?? ""}
              />
            </div>
          )}
        /> */}

        {/* <label className={labelClassName}>Delivery Time</label>
        <select
          id="deliveryTime"
          name="deliveryTime"
          // value={filters.deliveryTime}
          // onChange={handleFilterChange}
          className="pr-10 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm appearance-none w-full focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
        >
          <option value="" className="">
            Select Delivery Time
          </option>
          {expectedDelivery.map((delivery) => (
            <option key={delivery} value={delivery}>
              {delivery}
            </option>
          ))}
        </select> */}
        {/* Delivery In Days */}
        {/* <Controller
          name="offer.deliveryInDays"
          control={control}
          render={({ field }) => (
            <div className={formItemClassName}>
              <label className={labelClassName}>Delivery In Days</label>
              <Select
                {...field}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select delivery in days" />
                </SelectTrigger>
                <SelectContent>
                  {expectedDelivery.map((delivery) => (
                    <SelectItem key={delivery} value={delivery}>
                      {delivery}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        /> */}

        {/* Delivery In Days */}
        <Controller
          name="offer.deliveryInDays"
          control={control}
          render={({ field }) => (
            <div className={formItemClassName}>
              <label className={labelClassName}>Delivery In Days</label>
              <Select
                {...field}
                // NOTE: Select passes a string, so we must parse it back to a number
                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                // The Select component expects a string, so we convert the number back to a string for comparison
                value={String(field.value) || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select delivery in days" />
                </SelectTrigger>
                <SelectContent>
                  {/* Mapping over the new array of objects */}
                  {expectedDeliveryOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      // The SelectItem value is the numeric day, converted to a string
                      value={String(option.value)}
                    >
                      {/* Display the full, friendly label */}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full bg-[#616BA4] hover:bg-[#4E5683] cursor-pointer"
        >
          Send Offer
        </Button>
      </form>
    </BaseModal>
  );
};

export default SendOfferModal;
