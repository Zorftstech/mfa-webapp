import { ArrowUpDown } from "lucide-react";
import React from "react";

import Each from "@/components/helpers/each";
import ShopItem from "@/components/shared/shop-item";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";

import { dummyItems } from "@/app/dummyItem";

import ItemPagination from "./item-pagination";

function Items() {
   return (
      <main className="flex-[4] p-4">
         <div className="mb-4 flex w-full items-center justify-between">
            <Text size={"xs"} weight={"medium"}>
               Showing 1-20 of 500 results
            </Text>
            <div className="flex items-center justify-end gap-1">
               <ArrowUpDown className="w-3" />
               <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                     <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                     <SelectItem value="default">Default Sorting</SelectItem>
                     <SelectItem value="custom">Custom Sorting</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
         <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
            <Each
               of={dummyItems}
               render={(item: any, index: number) => <ShopItem key={index} itemDetails={item} />}
            />
         </div>
         <ItemPagination />
      </main>
   );
}

export default Items;
