import { ArrowRight } from "lucide-react";
import React from "react";

import Link from "next/link";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import OfftakeBanner from "@/components/shared/offtake-banner";
import ShopItem from "@/components/shared/shop-item";
import { Text } from "@/components/ui/text";

import { ShopItem as ItemType } from "@/types";

import { dummyItems } from "../dummyItem";

function FarmOfftake() {
   return (
      <Container backgroundColor="bg-gray-100">
         <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-8">
            <OfftakeBanner />
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
