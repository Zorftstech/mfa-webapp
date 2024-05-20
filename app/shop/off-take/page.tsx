"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import OfftakeBanner from "@/components/shared/offtake-banner";
import ShopItem from "@/components/shared/shop-item";

import { ShopItem as ItemType } from "@/types";

import RouteDisplay from "../../../components/shared/route-display";

import { dummyItems } from "@/app/dummyItem";

function page() {
   return (
      <div className="pt-[100px]">
         <RouteDisplay route="Farm Offtake" />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <OfftakeBanner />
               <div className="w-full py-4">
                  <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                     <Each
                        of={dummyItems}
                        render={(item: ItemType, index: number) => (
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
