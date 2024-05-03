"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import ShopItem from "@/components/shared/shop-item";
import SuggestedProducts from "@/components/shared/suggested-products";
import { Text } from "@/components/ui/text";

import dummyItem from "@/images/dummy-item.png";
import tomato from "@/images/tomato.png";
import { ShopItem as ItemType } from "@/types";

import RouteDisplay from "../../../components/shared/route-display";

import { FeedbackInformation } from "./molecules/feedback-information";
import ProductDescription from "./molecules/product-description";
import ProductImage from "./molecules/product-image";

const orange: ItemType = {
   id: 1,
   image: dummyItem,
   images: [dummyItem, tomato, dummyItem, dummyItem],
   name: "Nigerian Orange",
   no_of_items: 1,
   rating: 4,
   reviews: 12,
   price: 2000.0,
};

const dummyItems: ItemType[] = [
   {
      id: 1,
      image: dummyItem,
      name: "Orange (200g)",
      rating: 4.5,
      reviews: 12,
      price: 2000.0,
      no_of_items: 1,
   },
   {
      id: 2,
      image: dummyItem,
      name: "Orange (200g)",
      rating: 4.5,
      reviews: 12,
      price: 200.0,
      no_of_items: 1,
   },
   {
      id: 3,
      image: dummyItem,
      name: "Orange (200g)",
      rating: 4.5,
      reviews: 12,
      price: 200.0,
      no_of_items: 1,
   },
   {
      id: 4,
      image: dummyItem,
      name: "Orange (200g)",
      rating: 4.5,
      reviews: 12,
      price: 200.0,
      no_of_items: 1,
   },
];

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route={orange.name || ""} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <ProductImage images={orange.images} />
                  <ProductDescription currentItem={orange} />
                  <SuggestedProducts />
               </div>
               <div className="mb-8 mt-4 w-full">
                  <FeedbackInformation />
               </div>
               <Text size={"lg"} weight={"semibold"}>
                  Related Products
               </Text>
               <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
                  <Each
                     of={dummyItems}
                     render={(item: ItemType, index: number) => (
                        <ShopItem key={index} itemDetails={item} />
                     )}
                  />
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
