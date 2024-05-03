"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import FlashSaleBanner from "@/components/shared/flashsale-banner";
import ShopItem from "@/components/shared/shop-item";

import RouteDisplay from "../../../components/shared/route-display";

import { dummyItems } from "@/app/dummyItem";

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route="Flash Sales" />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <FlashSaleBanner />
               <div className="w-full py-4">
                  <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                     <Each
                        of={dummyItems}
                        render={(item: any, index: number) => (
                           <ShopItem key={index} itemDetails={item} />
                        )}
                     />
                  </div>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
