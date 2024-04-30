"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Newsletter from "@/components/shared/newsletter";

import UserProvider, { useUserContext } from "@/contexts/user-context";
import WorkspaceProvider from "@/contexts/workspace-context";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Topbar from "@/layout/topbar";
import { CartProvider } from "@/contexts/cart-context";

import "./globals.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
   return <UserProvider>{children}</UserProvider>;
};
export default function RootClientLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { width } = useWindowDimensions();
   return (
      <Providers>
         <CartProvider>
            <main className="min-h-screen">
               <Header />
               {children}
               {width && width > 768 && <Newsletter />}
               <Footer />
            </main>
         </CartProvider>
      </Providers>
   );
}
