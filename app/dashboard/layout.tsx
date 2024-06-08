"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import useStore from "@/store";

// would handle some auth checks for authenticated users

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
