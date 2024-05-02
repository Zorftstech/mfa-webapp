"use client";

import { Search, ArrowUpDown, ArrowUpDownIcon } from "lucide-react";

import Each from "@/components/helpers/each";
import { Input } from "@/components/ui/input";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import dummyimg from "../../images/dummy-category.png";

import "./categories.css";
import CategoryItem from "./category-item";

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
         <div className="flex w-full max-w-lg items-center justify-between gap-2">
            <div className="relative w-full">
               <Search className="absolute left-4 top-[25%] block w-4 md:hidden" />
               <Input
                  className="w-full rounded-full bg-white py-6 pl-[40px] md:pl-2"
                  placeholder={width && width > 768 ? "I am looking for..." : "What do you need?"}
               />
               <Search className="absolute right-4 top-[25%] hidden w-4 md:block" />
            </div>
            <div className="flex h-full w-12 items-center justify-center rounded-full bg-white md:hidden">
               <ArrowUpDown className="w-3 text-gray-800" />
            </div>
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
