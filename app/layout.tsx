import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Inter } from "next/font/google";

import ReactQueryProviders from "@/lib/react-query/provider";

import RootClientLayout from "./client-layout";
import "./globals.css";
import Head from "next/head";

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
         <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={""} />
            <meta property="og:title" content="My Food Angels" />
            <meta
               property="og:description"
               content="My Food Angels is a platform that connects food lovers with the best food vendors in Nigeria. We provide a platform for food vendors to showcase their products and services to a wider audience. We also provide a platform for food lovers to discover new and exciting food vendors in their area."
            />
            <meta property="og:url" content="http://myfoodangels.com" />
            <meta property="og:site_name" content="myfoodangels.com"></meta>
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     "@context": "https://schema.org",
                     "@type": "FAQPage",
                     mainEntity: [
                        {
                           "@type": "Question",
                           name: "What is My Food Angels?",
                           acceptedAnswer: {
                              "@type": "Answer",
                              text: "My Food Angels is a platform that connects food lovers with the best food vendors in Nigeria. We provide a platform for food vendors to showcase their products and services to a wider audience. We also provide a platform for food lovers to discover new and exciting food vendors in their area.",
                           },
                        },
                        {
                           "@type": "Question",
                           name: "How does My Food Angels work?",
                           acceptedAnswer: {
                              "@type": "Answer",
                              text: "My Food Angels works by providing a platform for food vendors to showcase their products and services to a wider audience. Food vendors can create a profile on the platform and list their products and services. Food lovers can then browse through the platform to discover new and exciting food vendors in their area. Food lovers can also place orders for food products and services directly through the platform.",
                           },
                        },
                     ],
                  }),
               }}
            />
         </Head>
         <body
            className={`${inter.className}  relative mx-auto h-full w-full  max-w-[180.75rem] overflow-x-hidden md:overflow-auto`}
         >
            <ReactQueryProviders>
               <RootClientLayout>{children}</RootClientLayout>
            </ReactQueryProviders>

            <Toaster richColors />
         </body>
      </html>
   );
}
