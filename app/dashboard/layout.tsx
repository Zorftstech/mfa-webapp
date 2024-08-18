"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import useStore from "@/store";
import { Metadata } from "next";

// would handle some auth checks for authenticated users

export const metadata: Metadata = {
   title: "Dashboard | MyFoodAngels",
   description:
      "Manage your account, orders, and subscriptions on MyFoodAngels. View your order history, track your deliveries, and manage your subscriptions.",
   generator: "Next.js",
   applicationName: "MyFoodAngels",
   referrer: "origin-when-cross-origin",
   keywords: [
      "Dashboard",
      "MyFoodAngels",
      "Account",
      "Orders",
      "Subscriptions",
      "Order History",
      "Track Deliveries",
      "Manage Subscriptions",
   ],
   authors: [{ name: "MyFoodAngels" }],
   creator: "MyFoodAngels",
   publisher: "MyFoodAngels",
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   openGraph: {
      title: "Dashboard | MyFoodAngels",
      description:
         "Manage your account, orders, and subscriptions on MyFoodAngels. View your order history, track your deliveries, and manage your subscriptions.",
      url: "https://myfoodangels.com/dashboard",
      siteName: "MyFoodAngels",
      images: [
         {
            url: "/images/og.jpg",
            width: 1200,
            height: 630,
         },
      ],
   },
};
export default function AuthLayout({ children }: { children: React.ReactNode }) {
   const { authDetails, loggedIn } = useStore((store) => store);
   const router = useRouter();

   useEffect(() => {
      if (!loggedIn) {
         router.push("/account/signin");
      }
   }, [loggedIn]);

   if (!loggedIn) {
      return <></>;
   }
   return <div>{children}</div>;
}
