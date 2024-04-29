import React from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function WishListMobile({ data }: { data: any }) {
   return (
      <div className="mb-5 block w-full p-4 md:hidden">
         {data.map((item: any) => (
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
                  </div>
               </div>
               <Button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black">
                  <X className="w-3" />
               </Button>
            </div>
         ))}
      </div>
   );
}

export default WishListMobile;
