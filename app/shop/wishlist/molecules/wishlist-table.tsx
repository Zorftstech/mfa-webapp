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

function WishListTable({ data }: { data: any }) {
   const { handlePlus } = useContext(CartContext);

   return (
      <div className="w-full px-8">
         <Table className="mt-6 hidden w-full md:table">
            <TableHeader>
               <TableRow>
                  <TableHead className="text-xs">PRODUCT</TableHead>
                  <TableHead className="text-xs">PRICE</TableHead>
                  <TableHead className="text-xs">STOCK STATUS</TableHead>
                  <TableHead className="text-right">{}</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((item: any) => (
                  <TableRow key={item.id}>
                     <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                           <Image className="w-7" src={item.image} alt={item.name} />
                           <Text size={"xs"}>{item.name}</Text>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Text size={"xs"}>₦{item.price.toLocaleString()}</Text>
                     </TableCell>
                     <TableCell className="">
                        <Text
                           className="w-fit rounded-2xl border border-green-100 bg-green-100 px-4 py-2"
                           size={"xs"}
                        >
                           {item.status}
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
                        <Button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
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
