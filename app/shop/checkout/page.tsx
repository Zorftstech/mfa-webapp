"use client";

import { X } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CheckoutForm } from "./molecules/form";
import { PaymentOption } from "./molecules/payment-option";

import { calculateTotalPrice } from "@/app/helper";
import { CartContext } from "@/contexts/cart-context";
import Each from "@/components/helpers/each";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { db } from "@/firebase";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
const formSchema = z.object({
   fname: z.string().min(2, {
      message: "Please enter a First name.",
   }),
   lname: z.string().min(2, {
      message: "Please enter a Last name.",
   }),
   country: z.string().min(2, {
      message: "Please enter a valid country.",
   }),

   state: z.string().min(2, {
      message: "Please enter a valid state.",
   }),
   email: z
      .string()
      .min(2, {
         message: "Please enter a valid email.",
      })
      .email(),
   phone: z.string(),
   streetAddress: z.string().min(2, {
      message: "Please enter a valid street address.",
   }),

   message: z.string(),
});
type formInterface = z.infer<typeof formSchema>;

function Page() {
   const { currentCart } = useContext(CartContext);
   const form = useForm<formInterface>({
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

   const publicKey = "pk_test_2f5fe11f645e8ffa062f379d652aef8daf391f82"; // Replace with your Paystack public key
   const amount = Number(calculateTotalPrice(currentCart) * 100);
   const [email, setEmail] = React.useState("customer@example.com");
   const [name, setName] = React.useState("Customer Name");
   const [formValues, setFormValues] = React.useState(form.getValues());

   const handlePayment = (values: formInterface, cartItems: typeof currentCart) => {
      if (window.PaystackPop === undefined) return;

      const handler = window.PaystackPop.setup({
         key: publicKey,
         email: values.email,
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
            toast.success("Payment Successful! Reference: " + response.reference);
            console.log(response);
            console.log("Call my own api, verify the transaction", values);
            // You can handle further processing here
            // Create order in Firebase
            const singleOrder = {
               name: `${values.fname} ${values.lname}`,
               firstName: values.fname,
               lastName: values.lname,
               email: values.email,
               totalAmount: amount,
               address: `${values.streetAddress}, ${values.state}, ${values.country}`,
               message: values.message,
               phone: values.phone,
               paymentReference: response.reference,
               cartItems,
            };
            console.log(singleOrder);
            const createOrder = async () => {
               try {
                  const collectionRef = collection(db, "orders");
                  await addDoc(collectionRef, singleOrder);
                  toast.success("Order created successfully!");
                  form.reset();
                  // router.push("/shop/success");
               } catch (error) {
                  console.error("Error creating order: ", error);
                  toast("Error creating order. Please try again.");
               }
            };
            createOrder();

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
   /* eslint-disable react-hooks/rules-of-hooks */

   // 2. Define a submit handler.
   function onSubmit(values: formInterface) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      setFormValues(values);
      handlePayment(values, currentCart);
   }

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
                        <RadioGroup className="my-3" defaultValue="card">
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem value="transfer" id="r1" disabled />
                              <Label htmlFor="r1">Bank Transfer</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="r2" />
                              <Label htmlFor="r2">Debit Card</Label>
                           </div>
                           {/* <div className="flex items-center space-x-2">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label htmlFor="r3">Wallet</Label>
                           </div> */}
                        </RadioGroup>

                        <Button
                           onClick={() => form.handleSubmit(onSubmit)()}
                           className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs"
                        >
                           Place Order
                        </Button>
                        <div className="hidde">
                           <PaystackButton
                              email={formValues.email}
                              amount={amount}
                              publicKey={publicKey}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
