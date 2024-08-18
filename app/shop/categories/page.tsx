"use client";

import RouteDisplay from "../../../components/shared/route-display";
import React, { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import Each from "@/components/helpers/each";
import ShopItem from "@/components/shared/shop-item";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import ItemPagination from "./molecules/item-pagination";
import useProducts from "../hooks/products/useProducts";
import "react-range-slider-input/dist/style.css";
import Filter from "./molecules/filter";
import Items from "./molecules/items";
import styles from "./page.module.css";
import { Filter as FilterIcon } from "lucide-react";

import {
   Accordion,
   AccordionItem,
   AccordionContent,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Price from "./molecules/price";
import ProductCategories from "./molecules/product-categories";
import Recommended from "./molecules/recommended";
import useStore from "@/store";
import { formatToNaira, revalidateNumber } from "@/lib/utils";
import { Metadata } from "next";
export const revalidate = 60;

export const metadata: Metadata = {
   title: "Categories | MyFoodAngels",
   description:
      "Browse our wide selection of groceries and food items at MyFoodAngels. Find fresh produce, pantry staples, and specialty foods delivered to your doorstep.",
   generator: "Next.js",
   applicationName: "MyFoodAngels",
   referrer: "origin-when-cross-origin",
   keywords: [
      "Food",
      "Grocery",
      "MyFoodAngels",
      "Online Shopping",
      "Fresh Produce",
      "Pantry Staples",
      "Specialty Foods",
      "Food Delivery",
   ],
   authors: [{ name: "MyFoodAngels" }],
   creator: "MyFoodAngels",
   publisher: "MyFoodAngels",
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   alternates: {
      canonical: "https://myfoodangels.com/shop",
      languages: {
         "en-US": "/en-US/shop",
         "de-DE": "/de-DE/shop",
      },
   },
   openGraph: {
      title: "Shop Our Wide Selection of Groceries | MyFoodAngels",
      description:
         "Discover a vast array of fresh produce, pantry essentials, and gourmet items. Shop conveniently with MyFoodAngels for all your grocery needs.",
      url: "https://myfoodangels.com/shop",
      siteName: "MyFoodAngels",
      images: [
         {
            url: "/images/og.jpg",
            width: 1200,
            height: 630,
            alt: "MyFoodAngels Shop Banner",
         },
      ],
      locale: "en_US",
      type: "website",
   },
   robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
         index: true,
         follow: true,
         noimageindex: false,
         "max-video-preview": -1,
         "max-image-preview": "large",
         "max-snippet": -1,
      },
   },
   icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
      other: {
         rel: "apple-touch-icon-precomposed",
         url: "/apple-touch-icon-precomposed.png",
      },
   },
   manifest: "https://myfoodangels.com/manifest.json",
   twitter: {
      card: "summary_large_image",
      title: "Shop Groceries Online | MyFoodAngels",
      description:
         "Find fresh produce, pantry staples, and specialty foods. Shop conveniently with MyFoodAngels for all your grocery needs.",
      siteId: "1467726470533754880",
      creator: "@MyFoodAngels",
      creatorId: "1467726470533754880",
      images: ["/images/og.jpg"],
   },
   viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
   },
   verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
      yahoo: "yahoo-site-verification-code",
      other: {
         me: ["my-email@example.com", "https://myfoodangels.com"],
      },
   },
   category: "Online Grocery Store",
};
function Page() {
   const { sortedAndFilteredProducts, handleSearch, handleSortChange, handlePriceChange } =
      useProducts();
   const { setSelectedCategory } = useStore((state) => state);
   const clearFilters = () => {
      setSelectedCategory(null);
   };

   const count = sortedAndFilteredProducts?.length ?? 0;

   return (
      <div className="bg-gray-100 pt-[100px]">
         <RouteDisplay route="Categories" />
         <main className="mx-auto mt-6 flex w-full max-w-[1200px] items-start justify-center gap-2 p-4">
            {/* filters */}
            <aside className={`${styles.filter_section} flex-[1.5] p-2`}>
               <Button onClick={clearFilters} className="w-full rounded-2xl">
                  Clear Filters
                  <FilterIcon className="w-3" />
               </Button>
               <Accordion
                  type="single"
                  collapsible
                  className="mt-3 w-full rounded-xl bg-white px-4 py-2"
               >
                  <ProductCategories />
                  <Price handlePriceChange={handlePriceChange} />
                  <Recommended />
                  {/* <RecentlyViewed /> */}
               </Accordion>
            </aside>
            {/* items lists */}
            <main className="flex-[4] p-4">
               <div className="mb-4 flex w-full items-center justify-between">
                  <Text size={"xs"} weight={"medium"}>
                     Showing 1-{count} of {count} results
                  </Text>
                  <div className="flex items-center justify-end gap-1">
                     <ArrowUpDown className="w-3" />
                     <Select onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[180px] bg-white">
                           <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                           <SelectItem value="year">Year</SelectItem>
                           <SelectItem value="month">Month</SelectItem>
                           <SelectItem value="day">Day</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
                  <Each
                     of={sortedAndFilteredProducts || []}
                     render={(item, index) => <ShopItem key={index} itemDetails={item} />}
                  />
               </div>
               {count > 20 && <ItemPagination />}
            </main>
         </main>
      </div>
   );
}

export default Page;
