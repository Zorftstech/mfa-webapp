"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import FlashSaleBanner from "@/components/shared/flashsale-banner";
import ShopItem from "@/components/shared/shop-item";

import RouteDisplay from "../../../components/shared/route-display";

import { dummyItems } from "@/app/dummyItem";
import { revalidateNumber } from "@/lib/utils";
import { categoriesId } from "@/lib/utils";
import useProducts from "../hooks/products/useProducts";
import { Show } from "@/components/helpers/show";
import useSections from "../hooks/sections/sections";
export const revalidate = 60;
function Page() {
   const { sortedAndFilteredProducts } = useProducts(categoriesId.flashSales);
   const { data: info } = useSections();
   const data = info ? info[0] : {};
   return (
      <Show>
         <Show.When isTrue={data?.showOfftakes}>
            <div className="pt-[100px]">
               <RouteDisplay route="Flash Sales" />
               <Container backgroundColor="bg-gray-100">
                  <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
                     <FlashSaleBanner />
                     <div className="w-full py-4">
                        <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                           <Each
                              of={sortedAndFilteredProducts || []}
                              render={(item: any, index: number) => (
                                 <ShopItem isFlashSale={true} key={index} itemDetails={item} />
                              )}
                           />
                        </div>
                     </div>
                  </main>
               </Container>
            </div>
         </Show.When>
         <Show.Else>
            <div className="pt-[100px]">
               <RouteDisplay route="Flash Sales" />
               <Container backgroundColor="bg-gray-100">
                  <p className="py-8 text-xl">
                     Available from <span>{data?.FlashSaleAvailable}</span>
                  </p>
               </Container>
            </div>
         </Show.Else>
      </Show>
   );
}

export default Page;
