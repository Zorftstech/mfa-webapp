"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

import CartTotal from "./cart-total";
import { CartContext } from "@/contexts/cart-context";

function CartMobile() {
   const { currentCart, handleMinus, handlePlus, handleRemove } = useContext(CartContext);

   return (
      <div className="my-5 block w-full bg-white p-4 md:hidden">
         {currentCart &&
            currentCart.map((item: any) => (
               <div
                  className="flex w-full items-center justify-between border-b border-gray-300 px-3 py-5"
                  key={item.id}
               >
                  <div className="flex w-full items-center gap-4">
                     <Image src={item.image} alt={item.name} />
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
                        <Text size={"sm"}>₦{item.price.toLocaleString()}</Text>
                        <Button className="mt-4 rounded-3xl px-4 text-xs">Add to Cart</Button>
                        <div className="my-3">
                           <div className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
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
                        </div>
                     </div>
                  </div>
                  <Button
                     onClick={() => handleRemove(item.id)}
                     className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                  >
                     <X className="w-3" />
                  </Button>
               </div>
            ))}
         <CartTotal />
      </div>
   );
}

export default CartMobile;
