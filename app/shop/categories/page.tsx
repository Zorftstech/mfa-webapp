"use client";

import React from "react";

import RouteDisplay from "../route-display";

import Filter from "./molecules/filter";
import Items from "./molecules/items";

function page() {
   return (
      <div className="bg-gray-100 pt-[69px]">
         <RouteDisplay route="Categories" />
         <main className="mx-auto mt-6 flex w-full max-w-[1200px] items-start justify-center gap-2 p-4">
            <Filter />
            <Items />
         </main>
      </div>
   );
}

export default page;
