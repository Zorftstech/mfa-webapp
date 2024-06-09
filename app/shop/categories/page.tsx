"use client";

import React from "react";

import RouteDisplay from "../../../components/shared/route-display";

import Filter from "./molecules/filter";
import Items from "./molecules/items";
import { revalidateNumber } from "@/lib/utils";
export const revalidate = revalidateNumber;
function page() {
   return (
      <div className="bg-gray-100 pt-[100px]">
         <RouteDisplay route="Categories" />
         <main className="mx-auto mt-6 flex w-full max-w-[1200px] items-start justify-center gap-2 p-4">
            <Filter />
            <Items />
         </main>
      </div>
   );
}

export default page;
