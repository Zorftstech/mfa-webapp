"use client";

import { Search, ArrowUpDown, ArrowUpDownIcon } from "lucide-react";

import Each from "@/components/helpers/each";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import dummyimg from "../../images/dummy-category.png";

import "./categories.css";
import CategoryItem from "./category-item";
import { Button } from "@/components/ui/button";

interface category {
   id: number;
   img: any;
   title: string;
}

const herocategories: category[] = [
   { id: 1, img: dummyimg, title: "Fresh Fruit" },
   { id: 2, img: dummyimg, title: "Fresh Fruit" },
   { id: 3, img: dummyimg, title: "Fresh Fruit" },
   { id: 4, img: dummyimg, title: "Fresh Fruit" },
];

export default function Hero() {
   const { width } = useWindowDimensions();
   return (
      <div
         className="relative flex h-[400px] flex-col items-center justify-center gap-6 border border-primary bg-primary px-4 pt-6"
         style={{
            backgroundImage: `url(/images/home/herobg.png)`,
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
         }}
      >
         <h2 className="mt-[3.75rem] hidden text-center text-3xl font-semibold text-white md:block">
            Need foodstuffs? ...
         </h2>

         {/* <Text className=" hidden text-center text-3xl font-semibold text-white md:block">
            Need foodstuffs? ...
         </Text> */}

         {/* <Button className="block rounded-full bg-white px-8 py-6 text-primary-2 shadow-lg md:hidden">
            View all
         </Button> */}

         <div className="flex w-full max-w-lg items-center justify-between gap-2">
            <div className="relative w-full">
               {width && width < 769 && <Search className="absolute left-4 top-[25%] w-4" />}
               <Input
                  className={` ${
                     width && width < 769 && "pl-[40px]"
                  } w-full rounded-full bg-white py-6 `}
                  placeholder={width && width > 768 ? "I am looking for..." : "What do you need?"}
               />
               {width && width > 768 && <Search className="absolute right-4 top-[25%] w-4" />}
            </div>
            {width && width < 769 && (
               <div className="flex h-full w-12 items-center justify-center rounded-full bg-white">
                  <ArrowUpDown className="w-3 text-gray-800" />
               </div>
            )}
         </div>
         <div className="category w-full max-w-lg p-2">
            <Each
               of={herocategories}
               render={(category: category, index: number) => (
                  <CategoryItem key={index} category={category} />
               )}
            />
         </div>
      </div>
   );
}
