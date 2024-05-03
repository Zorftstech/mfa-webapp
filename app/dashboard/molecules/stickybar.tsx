"use client";

import React from "react";
import { dashboardRoutes } from "../dashboard-routes";
import Each from "@/components/helpers/each";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Stickybar() {
   const pathname = usePathname();
   return (
      <div className="flex flex-1 flex-col items-center justify-start gap-2 border border-blue-500 bg-white p-3">
         <Each
            of={dashboardRoutes}
            render={(route: any, index: number) => (
               <Link
                  className={`w-full rounded-md border ${pathname === route.href ? "border-gray-100 bg-gray-100 text-[#7ab42c]" : "border-transparent"} px-2 py-3 text-sm`}
                  href={route.href}
               >
                  {route.title}
               </Link>
            )}
         />

         <Button>Logout</Button>
      </div>
   );
}

export default Stickybar;
