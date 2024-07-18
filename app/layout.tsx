import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Inter } from "next/font/google";

import ReactQueryProviders from "@/lib/react-query/provider";

import RootClientLayout from "./client-layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "My Food Angels",
   description: "My Food Angels",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <ReactQueryProviders>
               <RootClientLayout>{children}</RootClientLayout>
            </ReactQueryProviders>

            <Toaster richColors />
         </body>
      </html>
   );
}
