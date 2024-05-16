"use client";

import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

import Link from "next/link";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import OfftakeBanner from "@/components/shared/offtake-banner";
import FlashSaleBanner from "@/components/shared/flashsale-banner";
import ShopItem from "@/components/shared/shop-item";
import { Text } from "@/components/ui/text";

import { ShopItem as ItemType } from "@/types";

import { dummyItems } from "../dummyItem";

function FarmOfftake() {
   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

   const handleBannerIndex = (index: number) => setCurrentBannerIndex(index);

   // console.log(currentBannerIndex);

   useEffect(() => {
      const interval = setInterval(() => {
         if (currentBannerIndex === 0) {
            handleBannerIndex(1);
         } else {
            handleBannerIndex(0);
         }
      }, 5000);

      return () => clearInterval(interval);
   }, [currentBannerIndex]);

   return (
      <Container backgroundColor="bg-gray-100">
         <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-8">
            <div className="mb-1 flex w-full items-center justify-center gap-1">
               <span
                  onClick={() => handleBannerIndex(0)}
                  className={`h-3 w-3 cursor-pointer rounded-full ${currentBannerIndex === 0 ? "bg-[#7ab42c]" : "bg-gray-300"}`}
               ></span>
               <span
                  onClick={() => handleBannerIndex(1)}
                  className={`h-3 w-3 cursor-pointer rounded-full ${currentBannerIndex === 1 ? "bg-[#7ab42c]" : "bg-gray-300"}`}
               ></span>
            </div>
            <div className={`w-full md:w-fit ${currentBannerIndex === 0 ? "block" : "hidden"}`}>
               <OfftakeBanner />
            </div>
            <div className={`w-full md:w-fit ${currentBannerIndex === 1 ? "block" : "hidden"}`}>
               <FlashSaleBanner />
            </div>
            <div className="mt-4 w-full py-4">
               <div className="flex w-full items-center justify-between px-4">
                  <Text size={"xl"} weight={"semibold"}>
                     Farm Offtake
                  </Text>
                  <Link
                     href={"/shop/off-take"}
                     className="flex items-center justify-start gap-1 text-sm text-primary-2"
                  >
                     View All
                     <ArrowRight className="w-4 text-primary-2" />
                  </Link>
               </div>
               <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
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
   );
}

export default FarmOfftake;
