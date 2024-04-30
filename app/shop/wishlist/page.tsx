"use client";

import React from "react";

import Container from "@/components/shared/container";

import { Text } from "@/components/ui/text";
import WishListMobile from "./molecules/wishlist-mobile";
import WishListTable from "./molecules/wishlist-table";

import RouteDisplay from "../route-display";

import ShareItem from "@/components/shared/share-item";

import { wishlistItems } from "@/app/dummyItem";

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"Wishlist"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <Text size={"lg"} weight={"semibold"}>
                  My Wishlist
               </Text>
               <WishListMobile data={wishlistItems} />
               <WishListTable data={wishlistItems} />
               <div className="flex w-full items-center justify-start px-4">
                  <ShareItem />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
