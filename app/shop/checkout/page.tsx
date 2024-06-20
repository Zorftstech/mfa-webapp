"use client";

import { X } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import React, { useContext, useEffect } from "react";

import Image from "next/image";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import tomato from "@/images/tomato.png";
import { PaystackButton } from "react-paystack";

import RouteDisplay from "../../../components/shared/route-display";

import { CheckoutForm } from "./molecules/form";
import { PaymentOption } from "./molecules/payment-option";

import { calculateTotalPrice } from "@/app/helper";
import { CartContext } from "@/contexts/cart-context";
import Each from "@/components/helpers/each";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
   fname: z.string(),
   lname: z.string(),
   country: z.string(),
   state: z.string(),
   email: z.string(),
   phone: z.string(),
   streetAddress: z.string(),
   message: z.string(),
});

function Page() {
   const { currentCart } = useContext(CartContext);
   const publicKey = "pk_test_2f5fe11f645e8ffa062f379d652aef8daf391f82"; // Replace with your Paystack public key
   const amount = 10000; // Amount in kobo
   const [email, setEmail] = React.useState("customer@example.com");
   const [name, setName] = React.useState("Customer Name");
   const componentProps = {
      email,
      amount,
      metadata: {
         name,
         phone: "08012345678", // Optional
         custom_fields: [
            {
               display_name: "Mobile Numbe",
               variable_name: "mobile_number",
               value: "+2348012345678",
            },
         ],
      },
      publicKey,
      text: "Pay Now",
      onSuccess: (response: any) => {
         console.log(response);
         alert("Payment successful");
      },
      onClose: () => alert("Payment closed"),
   };

   const handlePayment = () => {
      if (window.PaystackPop === undefined) return;

      const handler = window.PaystackPop.setup({
         key: publicKey,
         email,
         amount,
         currency: "NGN",
         ref: "" + Math.floor(Math.random() * 1000000000 + 1), // Generate a unique reference number
         metadata: {
            custom_fields: [
               {
                  display_name: name,
                  variable_name: "name",
                  value: name,
               },
            ],
         },
         callback: (response) => {
            alert("Payment Successful! Reference: " + response.reference);
            // You can handle further processing here
         },
         onClose: () => {
            alert("Payment closed");
         },
      });

      handler.openIframe();
   };
   /* eslint-disable react-hooks/rules-of-hooks */
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         fname: "",
         country: "Nigeria",
         lname: "",
         state: "",
         email: "",
         phone: "",
         message: "",
      },
   });

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      console.log(values);
   }
   const { width } = useWindowDimensions();

   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"Shopping cart"} />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="flex w-full flex-col items-start justify-between gap-4 px-4 md:flex-row">
                  <div className="mt-6 w-full flex-[4] bg-white p-3">
                     <CheckoutForm form={form} onSubmit={onSubmit} />
                  </div>
                  <div className="flex w-full md:w-auto md:flex-[2] ">
                     <div className="mt-6 w-full bg-white p-4">
                        <Text size={"lg"} weight={"medium"}>
                           Order Summary
                        </Text>
                        <Each
                           of={currentCart}
                           render={(item) => (
                              <div className="my-2 flex items-center justify-between">
                                 <div className="p-3">
                                    <Image
                                       src={item.image}
                                       alt={item.name}
                                       className="h-10 w-10"
                                       width={12}
                                       height={12}
                                    />
                                    <Text size={"sm"} weight={"medium"}>
                                       {item.name}
                                    </Text>
                                 </div>
                                 <Text size={"sm"} weight={"medium"}>
                                    {item.no_of_items} x ₦{item.price.toLocaleString()}
                                 </Text>
                              </div>
                           )}
                        />
                        <Separator />
                        <div className="mt-3 flex items-center justify-between">
                           <Text size={"sm"} weight={"medium"}>
                              Subtotal:
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              ₦{calculateTotalPrice(currentCart).toLocaleString()}
                           </Text>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                           <Text size={"sm"} weight={"medium"}>
                              Shipping:
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              Free
                           </Text>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                           <Text size={"sm"} weight={"medium"}>
                              Total:
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              ₦{calculateTotalPrice(currentCart).toLocaleString()}
                           </Text>
                        </div>
                        <Separator className="my-3" />
                        {/* <Button className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs">Proceed to checkout</Button> */}
                        <Text size={"md"} weight={"semibold"}>
                           Payment Method
                        </Text>
                        <PaymentOption />
                        <Button
                           onClick={() => form.trigger()}
                           className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs"
                        >
                           Place Order
                        </Button>
                     </div>
                  </div>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
