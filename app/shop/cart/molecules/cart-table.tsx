"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
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
import { Text } from "@/components/ui/text";
import { CartContext } from "@/contexts/cart-context";

import Image from "next/image";

import { Minus, Plus, X } from "lucide-react";
import CartTotal from "./cart-total";
import Link from "next/link";

function CartTable() {
   const { currentCart, setCurrentCart } = useContext(CartContext);

   const handleMinus = (item: any) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: Math.max(item.no_of_items - 1, 1),
         };
         setCurrentCart(updatedCart);
      } else {
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
   };

   const handlePlus = (item: any) => {
      const currentItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      if (currentItemIndex !== -1) {
         const updatedCart = [...currentCart];
         updatedCart[currentItemIndex] = {
            ...item,
            no_of_items: item.no_of_items + 1,
         };
         setCurrentCart(updatedCart);
      } else {
         setCurrentCart([...currentCart, { ...item, no_of_items: 1 }]);
      }
   };

   const handleRemove = (itemId: string) => {
      const updatedCart = currentCart.filter((item) => item.id !== itemId);
      setCurrentCart(updatedCart);
   };

   return (
      <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
         <div className="mt-6 hidden w-full flex-[4] bg-white p-3 md:table">
            <Table className="">
               <TableHeader>
                  <TableRow>
                     <TableHead className="text-xs">PRODUCT</TableHead>
                     <TableHead className="text-xs">PRICE</TableHead>
                     <TableHead className="text-center text-xs">QUANTITY</TableHead>
                     <TableHead className="text-right">{}</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {currentCart &&
                     currentCart.map((item: any) => (
                        <TableRow key={item.id}>
                           <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                 <Image src={item.image} alt={item.name} />
                                 <Text size={"sm"}>{item.name}</Text>
                              </div>
                           </TableCell>
                           <TableCell>₦{item.price.toLocaleString()}</TableCell>
                           <TableCell className="">
                              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                                 <Button
                                    onClick={() => handleMinus(item)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                                 >
                                    <Minus className="w-4" />
                                 </Button>
                                 <Text size={"sm"} weight={"medium"}>
                                    {item.no_of_items}
                                 </Text>
                                 <Button
                                    onClick={() => handlePlus(item)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                                 >
                                    <Plus className="w-4" />
                                 </Button>
                              </div>
                           </TableCell>
                           <TableCell className="">
                              <Button
                                 onClick={() => handleRemove(item.id)}
                                 className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                              >
                                 <X className="w-3" />
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
            <div className="mt-5 flex w-full items-center justify-between px-4">
               <Link href="/shop" className="rounded-3xl bg-[#7ab42c] px-5 py-2 text-xs text-white">
                  Return to shop
               </Link>
            </div>
         </div>
         <div className="hidden flex-[2] md:flex">
            <CartTotal />
         </div>
      </div>
   );
}

export default CartTable;
