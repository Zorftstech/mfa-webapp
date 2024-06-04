"use client";

import { ArrowLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import useStore from "@/store";

// would handle some auth checks for authenticated users

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
   const { authDetails, loggedIn } = useStore((store) => store);
   const router = useRouter();

   if (!loggedIn) {
      return router.push("/account/signin");
   }
   return <div className="">{children}</div>;
}
