import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import ShopItem from "@/components/shared/shop-item";
import SuggestedProducts from "@/components/shared/suggested-products";
import { Text } from "@/components/ui/text";
import { useParams } from "next/navigation";
import dummyItem from "@/images/dummy-item.png";
import tomato from "@/images/tomato.png";
import { ShopItem as ItemType, SingleProduct } from "@/types";
import RouteDisplay from "../../../components/shared/route-display";
import { notFound } from "next/navigation";
import { FeedbackInformation } from "./molecules/feedback-information";
import ProductDescription from "./molecules/product-description";
import ProductImage from "./molecules/product-image";
import { reverseSplitStringByDashAndReplaceWithSpace } from "@/lib/utils";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import RelatedProducts from "./molecules/related-products";
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

interface params {
   params: {
      id: string;
   };
}
export const revalidate = 60;

async function Page({ params: { id } }: params) {
   const slug = id;
   async function queryCollectionByField(
      collectionName: string,
      fieldName: string,
      productSlug: string,
   ) {
      const q = query(collection(db, collectionName), where(fieldName, "==", productSlug));

      try {
         const querySnapshot = await getDocs(q);
         if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0];
            return { id: firstDoc.id, ...firstDoc.data() };
         } else {
            console.log("No matching documents found.");
            return null;
         }
      } catch (error) {
         console.error("Error querying documents: ", error);
         return null;
      }
   }

   const product: SingleProduct | null = (await queryCollectionByField(
      "products",
      "slug",
      slug,
   )) as SingleProduct;

   if (!slug) return notFound();
   if (!product) return notFound();
   console.log(product);

   return (
      <div className="pt-[100px]">
         <RouteDisplay route={product?.name || ""} />

         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <ProductImage image={product?.image} />
                  <ProductDescription
                     currentItem={{
                        name: product?.name,
                        price: product?.price,
                        no_of_items: product?.no_of_items,
                        units: product?.units,
                        category: product?.category,
                        subcategory: product?.subcategory,
                        slug: product?.slug,
                        status: product?.status,

                        ratings: product?.ratings?.map((rating) => {
                           return {
                              rating: rating.rating,
                              description: rating.description,
                              caption: rating.caption,
                              ratedBy: [
                                 "Anonymous",
                                 "Anonymous",
                                 "Anonymous",
                                 "Anonymous",
                                 "Anonymous",
                              ],
                           };
                        }),
                     }}
                  />
                  <SuggestedProducts productSlug={slug} />
               </div>
               <div className="mb-8 mt-4 w-full">
                  <FeedbackInformation currentItem={product} />
               </div>
               <RelatedProducts productSlug={slug} />
            </main>
         </Container>
      </div>
   );
}

export default Page;
