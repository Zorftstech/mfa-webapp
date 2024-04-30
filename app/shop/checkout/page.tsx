"use client";

import { X } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import React, { useContext } from "react";

import Image from "next/image";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import tomato from "@/images/tomato.png";

import RouteDisplay from "../route-display";

import { CheckoutForm } from "./molecules/form";
import { PaymentOption } from "./molecules/payment-option";

import { calculateTotalPrice } from "@/app/helper";
import { CartContext } from "@/contexts/cart-context";
import Each from "@/components/helpers/each";

const CartTotal = () => {
   const { currentCart } = useContext(CartContext);
   return (
      <div className="mt-6 w-full bg-white p-4">
         <Text size={"lg"} weight={"medium"}>
            Order Summary
         </Text>
         <Each
            of={currentCart}
            render={(item) => (
               <div className="my-2 flex items-center justify-between">
                  <div className="p-3">
                     <Image src={item.image} alt={item.name} className="h-10 w-10" />
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
         <Button className="mb-3 mt-5 w-full rounded-3xl px-4 text-xs">Place Order</Button>
      </div>
   );
};

function page() {
   /* eslint-disable react-hooks/rules-of-hooks */
   const { width } = useWindowDimensions();
   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"Shopping cart"} />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               {width && width <= 768 && (
                  <div className="mb-5 w-full p-4">
                     <CheckoutForm />
                     <CartTotal />
                  </div>
               )}
               {width && width > 768 && (
                  <div className="flex w-full items-start justify-between gap-4 px-4">
                     <div className="mt-6 w-full flex-[4] bg-white p-3">
                        <CheckoutForm />
                     </div>
                     <div className="flex flex-[2]">
                        <CartTotal />
                     </div>
                  </div>
               )}
            </main>
         </Container>
      </div>
   );
}

export default page;
