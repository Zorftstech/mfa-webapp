"use client";

import { HeartIcon, ShoppingCartIcon, Plus, Minus } from "lucide-react";
import React, { useState, useContext } from "react";

import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import { ShopItem } from "@/types";

import { CartContext } from "@/contexts/cart-context";

import ShareItem from "@/components/shared/share-item";
import Each from "@/components/helpers/each";

// import { CartContext } from "@/contexts/cart-context";

function ProductDescription({ currentItem }: { currentItem: ShopItem }) {
   const [productCount, setProductCount] = useState(1);

   // console.log(currentItem, "2");

   const { handlePlus } = useContext(CartContext);

   const [selectedWeightId, setSelectedWeightId] = useState(1);

   const handleWeight = (id: any) => {
      setSelectedWeightId(id);
   };

   const dummyWeights = [
      { id: 1, title: "Half Paint Bucket" },
      { id: 2, title: "Paint Bucket 3KG" },
      { id: 3, title: "50KG Basket" },
   ];

   const handleAdd = () => {
      setProductCount(productCount + 1);
   };

   const handleMinus = () => {
      if (productCount === 1) return setProductCount(1);
      setProductCount(productCount - 1);
   };

   return (
      <div className="flex-1 p-2">
         <div className="flex w-full items-center justify-between">
            <Text size={"2xl"} weight={"semibold"}>
               {currentItem.title}
            </Text>
            <Button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
               <HeartIcon className="w-4 text-gray-600" />
            </Button>
         </div>
         <div className="mt-4 flex items-end justify-start gap-2">
            <Ratings value={currentItem.rating} />
            <Text size={"xs"} weight={"medium"}>
               {" "}
               {currentItem.reviews} reviews
            </Text>
         </div>
         <div className="mt-2 flex w-full items-center justify-start gap-2">
            <Text size={"md"} weight={"semibold"}>
               ₦{currentItem.price.toLocaleString()}
            </Text>
            <Text
               className="rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
               size={"xs"}
               weight={"normal"}
            >
               In stock
            </Text>
         </div>
         <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
            <Text size={"sm"} weight={"medium"}>
               Weight:
            </Text>
            <Each
               of={dummyWeights}
               render={(item) => (
                  <Button
                     key={item.id}
                     onClick={() => setSelectedWeightId(item.id)}
                     className={
                        item.id === selectedWeightId
                           ? `rounded-2xl border border-[#7ab42c] bg-[#7ab42c] px-4 py-1 text-white`
                           : `rounded-2xl border border-gray-300 bg-white px-4 py-1 text-gray-600`
                     }
                  >
                     {item.title}
                  </Button>
               )}
            />
         </div>
         <Separator className="my-4" />
         <div className="my-3">
            <div className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
               <Button
                  onClick={handleMinus}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
               >
                  <Minus className="w-4" />
               </Button>
               <Text size={"sm"} weight={"medium"}>
                  {productCount}
               </Text>
               <Button
                  onClick={handleAdd}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
               >
                  <Plus className="w-4" />
               </Button>
            </div>
         </div>

         <Button
            onClick={(e) => handlePlus(currentItem)}
            className="mt-4 w-full rounded-3xl text-sm"
         >
            Add to Cart <ShoppingCartIcon className="w-4 text-white" />
         </Button>
         <Separator className="my-4" />
         <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
            <Text size={"sm"} weight={"medium"}>
               Category: <span className="text-gray-400">Fruits</span>
            </Text>
         </div>
         <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
            <Text size={"sm"} weight={"medium"}>
               Tag: <span className="text-gray-400">Vegetables Citrus Cabbage Green Cabbage</span>
            </Text>
         </div>
         <ShareItem />
      </div>
   );
}

export default ProductDescription;
