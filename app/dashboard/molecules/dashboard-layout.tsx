"use client";

import React, { useState } from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./side-bar";
import { ReactNode } from "react";
import { AlignJustify } from "lucide-react";
import Stickybar from "./stickybar";

interface DashboardLayoutProps {
   children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
   const [showSticky, setSticky] = useState(false);

   const handleSticky = () => {
      setSticky(!showSticky);
   };
   return (
      <div className="pt-[69px]">
         <RouteDisplay route="Dashboard" />
         <Container backgroundColor="bg-gray-100">
            <main className="relative mx-auto flex w-full max-w-[1200px] items-start justify-between gap-2 py-4">
               <AlignJustify
                  onClick={handleSticky}
                  className="absolute left-2 top-6 w-4 md:hidden"
               />
               <Sidebar />
               {showSticky && <Stickybar handleSticky={handleSticky} />}
               <div className="flex-[4] bg-white px-2 py-10 md:py-2">{children}</div>
            </main>
         </Container>
      </div>
   );
}

export default DashboardLayout;