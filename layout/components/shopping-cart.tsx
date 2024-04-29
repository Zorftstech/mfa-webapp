import { ShoppingBag, X } from "lucide-react";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import tomato from "@/images/tomato.png";

function ShoppingCart() {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"none"} className="relative pr-2">
               <ShoppingBag className="w-6" />
               <span
                  className="absolute right-0 rounded-full bg-primary px-2"
                  style={{ top: "-5px" }}
               >
                  <Text variant={"white"} size={"xs"} style={{ fontSize: "10px" }}>
                     0
                  </Text>
               </span>
            </Button>
         </PopoverTrigger>
         <PopoverContent className="bg-white">
            <div className="grid gap-4">
               <div className="space-y-2">
                  <h4 className="font-medium leading-none">Shopping Card (1)</h4>
               </div>
               <div className="grid gap-2">
                  <div className="w-full">
                     <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center justify-start gap-2">
                           <Image src={tomato} alt="Tomato" />
                           <div>
                              <Text size={"sm"} weight={"medium"}>
                                 Tomato
                              </Text>
                              <Text size={"xs"}>
                                 1kg x <span className="font-semibold">4.00</span>
                              </Text>
                           </div>
                        </div>
                        <Button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
                           <X className="w-3" />
                        </Button>
                     </div>
                     <Separator />
                     <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center justify-start gap-2">
                           <Image src={tomato} alt="Tomato" />
                           <div>
                              <Text size={"sm"} weight={"medium"}>
                                 Tomato
                              </Text>
                              <Text size={"xs"}>
                                 1kg x <span className="font-semibold">4.00</span>
                              </Text>
                           </div>
                        </div>
                        <Button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
                           <X className="w-3" />
                        </Button>
                     </div>
                     <div className="mt-3 flex items-center justify-between gap-2">
                        <Text size={"xs"} weight={"medium"}>
                           2 Products
                        </Text>
                        <Text size={"sm"} weight={"semibold"}>
                           ₦400
                        </Text>
                     </div>
                     <div className="mt-6 flex w-full flex-col gap-4">
                        <Link
                           href={"/shop/checkout"}
                           className="w-full rounded-3xl bg-[#7ab42c] py-2 text-center text-xs text-white"
                        >
                           Checkout
                        </Link>
                        <Link
                           href={"/shop/cart"}
                           className="w-full rounded-3xl bg-gray-100 py-2 text-center text-xs text-[#7ab42c]"
                        >
                           Go to Cart
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
}

export default ShoppingCart;
