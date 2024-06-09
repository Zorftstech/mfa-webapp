"use client";

import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { Eye, HeartIcon } from "lucide-react";
import React, { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { ShopItem } from "@/types";

import { Button } from "../ui/button";
import { Text } from "../ui/text";

import styles from "./shop-item.module.css";

import { CartContext } from "@/contexts/cart-context";

import { cn } from "@/lib/utils/css";

const Shop = ({ itemDetails, isFlashSale }: { itemDetails: ShopItem; isFlashSale?: boolean }) => {
   const { handlePlus } = useContext(CartContext);

   return (
      <div
         //  href={`/shop/${itemDetails.id}`}
         className="relative w-full cursor-pointer border border-transparent bg-white px-4 py-10 shadow-none duration-300 hover:border-gray-300"
      >
         {isFlashSale && (
            <div className="absolute left-1 top-1 z-10 rounded-3xl bg-red-800 px-5 py-2 text-xs text-white md:left-3 md:top-3">
               Save ₦{itemDetails.amountSaved?.toLocaleString()}
            </div>
         )}
         <HeartIcon className="absolute right-3 top-3 z-20 w-6 text-gray-600" />
         <div className="w-full p-0">
            <div
               className={`${styles.img_container} relative flex w-full items-center justify-center`}
            >
               <Link href={`/shop/${itemDetails.id}`}>
                  <Image
                     src={itemDetails.image}
                     alt={"image"}
                     width={300}
                     height={300}
                     className="h-[10rem] w-[13rem] rounded-md object-cover"
                  />
               </Link>
               <div className="absolute bottom-0 hidden w-full items-center justify-between border border-gray-300 bg-gray-200 md:flex">
                  <button
                     onClick={(e) => handlePlus(itemDetails)}
                     className="flex w-[50%] flex-col items-center justify-center rounded-none p-0"
                  >
                     <HeartIcon className="w-4" />
                     <Text size={"xs"} weight={"medium"}>
                        Add to Wishlist
                     </Text>
                  </button>
                  <Link
                     className="flex w-[50%] flex-col items-center justify-center py-[11.5px]"
                     href={`/shop/${itemDetails.id}`}
                  >
                     <Eye className="w-4" />
                     <Text size={"xs"} weight={"medium"}>
                        View Item
                     </Text>
                  </Link>
               </div>
            </div>
            <Link
               href={`/shop/${itemDetails.id}`}
               className="flex w-full flex-col items-start justify-start"
            >
               <Text className="mt-2" size={"sm"} weight={"semibold"}>
                  {itemDetails.name}
               </Text>
               <div className="my-2 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                  <Text
                     size={"xs"}
                     weight={"medium"}
                     className="flex items-center gap-1 text-gray-500"
                  >
                     <StarIcon className="w-3" />
                     {itemDetails.rating || 5} ({itemDetails.reviews || 10} reviews)
                  </Text>
                  <div className="flex items-center justify-end gap-2">
                     {isFlashSale && (
                        <Text weight={"semibold"} size={"xs"}>
                           ₦{itemDetails?.newPrice?.toLocaleString()}
                        </Text>
                     )}
                     <Text
                        className={cn("", isFlashSale && "text-gray-500 line-through")}
                        weight={"semibold"}
                        size={"xs"}
                     >
                        ₦{itemDetails.price.toLocaleString()}
                     </Text>
                  </div>
               </div>
            </Link>
            <Button
               onClick={(e) => handlePlus(itemDetails)}
               className="mt-4 w-full rounded-3xl text-xs"
            >
               Add to Cart <ShoppingCartIcon className="w-3 text-white" />
            </Button>
         </div>
      </div>
   );
};

export default Shop;
