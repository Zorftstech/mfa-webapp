"use client";

import React from "react";

import Container from "@/components/shared/container";

import { Text } from "@/components/ui/text";
import WishListMobile from "./molecules/wishlist-mobile";
import WishListTable from "./molecules/wishlist-table";

import RouteDisplay from "../../../components/shared/route-display";

import ShareItem from "@/components/shared/share-item";

import { wishlistItems } from "@/app/dummyItem";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import useStore from "@/store";

function Page() {
   const { authDetails, loggedIn } = useStore((store) => store);
   const { data } = useQueryCollectionByField("wishlist", "userId", authDetails.id ?? "");
   console.log(data);
   return (
      <div className="pt-[100px]">
         <RouteDisplay route={"Wishlist"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <Text size={"lg"} weight={"semibold"}>
                  My Wishlist
               </Text>
               <WishListMobile data={data ? data[0]?.items : []} />
               <WishListTable data={data ? data[0]?.items : []} />
               <div className="flex w-full items-center justify-start px-4">
                  <ShareItem />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
