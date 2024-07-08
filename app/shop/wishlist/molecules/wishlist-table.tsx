"use client";
import React, { useContext } from "react";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
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
function WishListTable({ data }: { data: any }) {
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
      <div className="w-full px-8">
         <Table className="mt-6 hidden w-full md:table">
            <TableHeader>
               <TableRow>
                  <TableHead className="text-xs">PRODUCT</TableHead>
                  <TableHead className="text-xs">PRICE</TableHead>
                  <TableHead className="text-right">{}</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((item: any) => (
                  <TableRow key={item.id}>
                     <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                           <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="w-7"
                           />
                           <Text size={"xs"}>{item.name}</Text>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Text size={"xs"}>
                           {" "}
                           {formatToNaira(Number(item.units && item.units[0].price) ?? 0)}
                        </Text>
                     </TableCell>

                     <TableCell className="">
                        <Button
                           onClick={() => handlePlus(item)}
                           className="rounded-3xl px-4 text-xs"
                        >
                           Add to Cart
                        </Button>
                     </TableCell>
                     <TableCell className="">
                        <Button
                           onClick={() => removeFromWishList(item)}
                           className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                        >
                           <X className="w-3" />
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}

export default WishListTable;
