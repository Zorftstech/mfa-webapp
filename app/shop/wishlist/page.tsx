"use client";

import React from "react";

import Container from "@/components/shared/container";

import { Text } from "@/components/ui/text";
import WishListMobile from "./molecules/wishlist-mobile";
import WishListTable from "./molecules/wishlist-table";

import RouteDisplay from "../../../components/shared/route-display";

import ShareItem from "@/components/shared/share-item";
import { collection, query, where, getDocs, updateDoc, arrayRemove, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { wishlistItems } from "@/app/dummyItem";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import useStore from "@/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function Page() {
   const { authDetails, loggedIn } = useStore((store) => store);
   const { data, refetch } = useQueryCollectionByField("wishlist", "userId", authDetails.id ?? "");
   const router = useRouter();
   const removeFromWishList = (item: any) => {
      const removeItem = async () => {
         if (!authDetails || !authDetails.id) {
            console.error("User ID is undefined or authDetails is not properly initialized.");
            toast.error("Error removing item from wishlist. User ID is missing.");
            return;
         }

         try {
            const collectionRef = collection(db, "wishlist");
            const q = query(collectionRef, where("userId", "==", authDetails.id));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
               toast.error("No wishlist found for the user.");
               return;
            }

            const wishlistDoc = querySnapshot.docs[0];
            const wishlistDocRef = doc(db, "wishlist", wishlistDoc.id);

            await updateDoc(wishlistDocRef, {
               items: arrayRemove(item),
            });

            toast.success("Item removed from wishlist successfully.");
            refetch();
         } catch (error) {
            console.error("Error removing item from wishlist: ", error);
            toast.error("Error removing item from wishlist. Please try again.");
         }
      };

      removeItem();
   };
   return (
      <div className="pt-[100px]">
         <RouteDisplay route={"Wishlist"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <Text size={"lg"} weight={"semibold"}>
                  My Wishlist
               </Text>
               <WishListMobile
                  data={data ? data[0]?.items : []}
                  removeFromWishList={removeFromWishList}
               />
               <WishListTable
                  data={data ? data[0]?.items : []}
                  removeFromWishList={removeFromWishList}
               />
               <div className="flex w-full items-center justify-start px-4">
                  <ShareItem />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
