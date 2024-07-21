"use client";
import { Copy, Eye, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useStore from "@/store";
import axios from "axios";
import ProcessError from "@/lib/error";
import { PaystackButton } from "react-paystack";
import Spinner from "@/components/ui/spinner";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
const formSchema = z.object({
   amount: z.number().min(3, {
      message: "Amount must be at least 3 characters.",
   }),
});
type formInterface = z.infer<typeof formSchema>;
const WalletCard = ({ amount }: { amount: string }) => {
   const [showFundForm, setShowFundForm] = useState(false);
   const form = useForm<formInterface>({
      resolver: zodResolver(formSchema),
   });
   const publicKey = "pk_test_2f5fe11f645e8ffa062f379d652aef8daf391f82"; // Replace with your Paystack public key

   const { authDetails } = useStore((store) => store);
   const { mutate, isPending } = useMutation<any, any, formInterface>({
      mutationFn: async ({ amount }) => {
         //  toast.success("Subscribed successfully");
         const user = await axios.post("/api/newsletter", { name: amount });
         console.log({ user });

         return user;
      },
      onSuccess: async (data) => {
         toast.success("Subscribed successfully");
         form.reset();
      },
      onError: (err) => {
         ProcessError(err);
      },
   });

   const handlePayment = (amount: number) => {
      if (window.PaystackPop === undefined) return;

      const handler = window.PaystackPop.setup({
         key: publicKey,
         email: authDetails.email!,
         amount,
         currency: "NGN",
         ref: "MFA" + Math.floor(Math.random() * 100000000000000000 + 1638), // Generate a unique reference number
         metadata: {
            custom_fields: [
               {
                  display_name: `${authDetails.firstName} ${authDetails.lastName}`,
                  variable_name: "name",
                  value: `${authDetails.firstName} ${authDetails.lastName}`,
               },
            ],
         },
         callback: (response) => {
            toast.success("Payment Successful! Reference: " + response.reference);
            console.log(response);
            console.log("Call my own api, verify the transaction", amount);
            setShowFundForm(false);

            // You can handle further processing here
            // Create order in Firebase
            // const singleOrder = {
            //    name: `${values.fname} ${values.lname}`,
            //    firstName: values.fname,
            //    lastName: values.lname,
            //    email: values.email,
            //    totalAmount: amount,
            //    address: `${values.streetAddress}, ${values.state}, ${values.country}`,
            //    message: values.message,
            //    phone: values.phone,
            //    paymentReference: `${response.reference}`,
            //    cartItems,
            //    orderId: `${response.reference}`,
            //    status: "pending",
            //    userId: authDetails.id || values.email,
            // };
            // console.log(singleOrder);
            // const createOrder = async () => {
            //    try {
            //       const collectionRef = collection(db, "orders");
            //       await addDoc(collectionRef, singleOrder);
            //       toast.success("Order created successfully!");
            //       form.reset();
            //       // router.push("/shop/success");
            //    } catch (error) {
            //       console.error("Error creating order: ", error);
            //       toast("Error creating order. Please try again.");
            //    }
            // };
            // createOrder();

            // clear cart
            //route back
            //reset forms
         },
         onClose: () => {
            alert("Payment closed");
         },
      });

      handler.openIframe();
   };
   function onSubmit(values: formInterface) {
      handlePayment(values.amount * 100);
   }

   if (!showFundForm)
      return (
         <div className="h-55 w-85 mb-5 ml-5 mt-5 flex flex-col justify-between rounded-3xl bg-gradient-to-r from-[#72a929] to-[#83bf33] p-4">
            <div>
               <p className="mb-6 text-sm font-normal text-white">Account balance</p>
               <h2 className="mb-6 mr-4 text-4xl font-bold text-white">
                  {amount}{" "}
                  <Eye className="ml-4 inline-block cursor-pointer align-middle" size={24} />
               </h2>
            </div>
            <div>
               <button
                  onClick={() => setShowFundForm(true)}
                  className="w-15 flex items-center rounded-2xl bg-white px-4 py-2 text-[#565656]"
               >
                  Fund
                  <Plus className="ml-2 text-[#7AB42C]" size={18} />
               </button>
            </div>
         </div>
      );

   return (
      <>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="grid w-full grid-cols-1 gap-4 p-4"
            >
               <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              className="rounded-2xl border border-gray-100 bg-gray-100"
                              placeholder="Amount"
                              {...field}
                              type="number"
                              onChange={(e) => {
                                 const value = e.target.value;
                                 field.onChange(value === "" ? "" : Number(value));
                              }}
                              value={field.value}
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />

               <Button className="col-span-2  rounded-2xl" type="submit" disabled={isPending}>
                  {isPending ? <Spinner /> : "Fund"}
               </Button>
            </form>
         </Form>
         <div className="hidde">
            <PaystackButton
               email={authDetails.email ?? ""}
               amount={form.getValues().amount * 100}
               publicKey={publicKey}
            />
         </div>
      </>
   );
};

export default WalletCard;
