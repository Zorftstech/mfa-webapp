import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./molecules/side-bar";

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route="Dashboard" />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] items-start justify-between gap-1 border border-red-500 py-4">
               <Sidebar />
               <div className="flex-[4] border border-red-500"></div>
            </main>
         </Container>
      </div>
   );
}

export default page;
