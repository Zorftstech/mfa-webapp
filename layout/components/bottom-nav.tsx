"use client";

import { Home, ShoppingCart, Heart, User } from "lucide-react";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Each from "@/components/helpers/each";
import { Text } from "@/components/ui/text";

const links = [
   { id: 1, title: "Home", href: "/", icon: <Home className="w-10" /> },
   { id: 2, title: "Cart", href: "/shop/cart", icon: <ShoppingCart className="w-10" /> },
   { id: 3, title: "Wishlist", href: "/shop/wishlist", icon: <Heart className="w-10" /> },
   { id: 4, title: "Account", href: "/dashboard", icon: <User className="w-10" /> },
];
function BottomNav() {
   const pathname = usePathname();

   return (
      <div className="fixed bottom-0 z-40 mt-3 flex w-full items-center justify-between border border-gray-100 bg-white p-4 shadow">
         <Each
            of={links}
            render={(item: any, index: number) => (
               <Link
                  className={`flex flex-1 flex-col ${pathname === item.href ? "text-primary-2" : "text-gray-700"} items-center justify-center gap-2`}
                  href={item.href}
               >
                  {item.icon}
                  <Text
                     className={pathname === item.href ? "text-primary-2" : "text-gray-700"}
                     size={"xs"}
                     weight={"medium"}
                  >
                     {item.title}
                  </Text>
               </Link>
            )}
         />
      </div>
   );
}

export default BottomNav;
