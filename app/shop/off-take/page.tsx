"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import OfftakeBanner from "@/components/shared/offtake-banner";
import ShopItem from "@/components/shared/shop-item";

import { ShopItem as ItemType } from "@/types";

import RouteDisplay from "../../../components/shared/route-display";

import { dummyItems } from "@/app/dummyItem";
import { revalidateNumber } from "@/lib/utils";
import { categoriesId } from "@/lib/utils";
import useProducts from "../hooks/products/useProducts";
export const revalidate = 60;
function Page() {
   const { sortedAndFilteredProducts } = useProducts(categoriesId.farmOffTake);

   return (
      <div className="pt-[100px]">
         <RouteDisplay route="Farm Offtake" />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <OfftakeBanner />
               <div className="w-full py-4">
                  <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                     <Each
                        of={sortedAndFilteredProducts || dummyItems}
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

export default Page;
