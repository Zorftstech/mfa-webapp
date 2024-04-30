"use client";

import React from "react";

import Container from "@/components/shared/container";
import { Text } from "@/components/ui/text";
import tomato from "@/images/tomato.png";
import CartMobile from "./molecules/cart-mobile";
import CartTable from "./molecules/cart-table";
import RouteDisplay from "../route-display";

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"Shopping cart"} />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto my-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 p-4">
               <Text size={"md"} weight={"semibold"}>
                  My Shopping cart
               </Text>
               <CartMobile />
               <CartTable />
            </main>
         </Container>
      </div>
   );
}

export default page;
