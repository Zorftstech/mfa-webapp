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

const Shop = ({ itemDetails }: { itemDetails: ShopItem }) => {
   const { handlePlus } = useContext(CartContext);

   return (
      <div
         //  href={`/shop/${itemDetails.id}`}
         className="relative w-full cursor-pointer border border-transparent bg-white px-4 py-6 shadow-none duration-300 hover:border-gray-300"
      >
         <HeartIcon className="absolute right-3 top-3 z-20 w-6 text-gray-600" />
         <div className="w-full p-0">
            <div
               className={`${styles.img_container} relative flex w-full items-center justify-center`}
            >
               <Link href={`/shop/${itemDetails.id}`}>
                  <Image src={itemDetails.image} alt={"image"} width={300} height={300} />
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
                     {itemDetails.rating} ({itemDetails.reviews} reviews)
                  </Text>
                  <Text weight={"semibold"} size={"xs"}>
                     ₦{itemDetails.price.toLocaleString()}
                  </Text>
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
