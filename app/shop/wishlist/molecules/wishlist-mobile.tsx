"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CartContext } from "@/contexts/cart-context";
import { formatToNaira } from "@/lib/utils";
import { collection, query, where, getDocs, updateDoc, arrayRemove, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import useStore from "@/store";
import { useRouter } from "next/navigation";

function WishListMobile({ data }: { data: any }) {
   const { handlePlus } = useContext(CartContext);
   const { authDetails, loggedIn } = useStore((store) => store);
   const router = useRouter();

   const removeFromWishList = (item: any) => {
      const removeOrder = async () => {
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
            router.refresh();
         } catch (error) {
            console.error("Error removing item from wishlist: ", error);
            toast.error("Error removing item from wishlist. Please try again.");
         }
      };

      removeOrder();
   };

   return (
      <div className="mb-5 block w-full p-4 md:hidden">
         {data.map((item: any) => (
            <div
               className="flex w-full items-center justify-between border-b border-gray-300 px-3 py-5"
               key={item.id}
            >
               <div className="flex w-full items-center gap-4">
                  <Image src={item.image} alt={item.name} width={100} height={100} />
                  <div>
                     {" "}
                     <Text size={"sm"} weight={"medium"}>
                        {item.name}
                     </Text>{" "}
                     <Text
                        className="my-2 w-fit rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
                        size={"xs"}
                        weight={"normal"}
                     >
                        {item.status}
                     </Text>
                     <Text size={"sm"}>
                        {" "}
                        {formatToNaira(Number(item.units && item.units[0].price) ?? 0)}
                     </Text>
                     <Button
                        onClick={() => handlePlus(item)}
                        className="mt-4 rounded-3xl px-4 text-xs"
                     >
                        Add to Cart
                     </Button>
                  </div>
               </div>
               <Button
                  onClick={() => removeFromWishList(item)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
               >
                  <X className="w-3" />
               </Button>
            </div>
         ))}
      </div>
   );
}

export default WishListMobile;
