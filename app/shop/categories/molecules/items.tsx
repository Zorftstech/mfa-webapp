import React from "react";
import { ArrowUpDown } from "lucide-react";
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
import ItemPagination from "./item-pagination";
import useProducts from "../../hooks/products/useProducts";

function Items() {
   const { sortedAndFilteredProducts, handleSearch, handleSortChange } = useProducts();
   const count = sortedAndFilteredProducts?.length ?? 0;
   return (
      <main className="flex-[4] p-4">
         <div className="mb-4 flex w-full items-center justify-between">
            <Text size={"xs"} weight={"medium"}>
               Showing 1-{count} of {count} results
            </Text>
            <div className="flex items-center justify-end gap-1">
               <ArrowUpDown className="w-3" />
               <Select onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] bg-white">
                     <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                     <SelectItem value="year">Year</SelectItem>
                     <SelectItem value="month">Month</SelectItem>
                     <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
         <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
            <Each
               of={sortedAndFilteredProducts || []}
               render={(item, index) => <ShopItem key={index} itemDetails={item} />}
            />
         </div>
         {count > 20 && <ItemPagination />}
      </main>
   );
}

export default Items;
