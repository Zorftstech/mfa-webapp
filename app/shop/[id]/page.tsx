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
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import RelatedProducts from "./molecules/related-products";
import { Metadata, ResolvingMetadata } from "next";
import { capitalizeFirstLetter } from "@/lib/helpers";

interface params {
   params: {
      id: string;
   };
}
export const revalidate = 60;

async function queryCollectionByField(
   collectionName: string,
   productId: string, 
) {
   const docRef = doc(db, collectionName, productId); 

   try {
      const docSnapshot = await getDoc(docRef); 
      if (docSnapshot.exists()) {
         return { id: docSnapshot.id, ...docSnapshot.data() }; 
      } else {
         console.log("No matching documents found.");
         return null;
      }
   } catch (error) {
      console.error("Error querying documents: ", error);
      return null;
   }
}

export async function generateMetadata(
   { params }: params,
   parent: ResolvingMetadata,
): Promise<Metadata> {
   const slug = params.id;
   const product: SingleProduct | null = (await queryCollectionByField(
      "products",
      slug
   )) as SingleProduct;

   if (!product) {
      return {
         title: "Product Not Found | MyFoodAngels",
         description: "The requested product could not be found.",
      };
   }

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: `${capitalizeFirstLetter(product.name)} | MyFoodAngels`,
      description: product.desc || `Buy ${product.name} at MyFoodAngels`,
      generator: "Next.js",
      applicationName: "MyFoodAngels",
      referrer: "origin-when-cross-origin",
      keywords: [
         "Food",
         "Grocery",
         "MyFoodAngels",
         "Online Shopping",
         product.name,
         product?.category?.name,
         product?.subcategory?.name,
      ].filter((keyword): keyword is string => typeof keyword === "string"),
      authors: [{ name: "MyFoodAngels" }],
      creator: "MyFoodAngels",
      publisher: "MyFoodAngels",
      alternates: {
         canonical: `https://myfoodangels.com/${slug}`,
         languages: {
            "en-US": "/en-US",
            "de-DE": "/de-DE",
         },
      },
      formatDetection: {
         email: false,
         address: false,
         telephone: false,
      },
      openGraph: {
         title: `${capitalizeFirstLetter(product.name)} | MyFoodAngels`,
         description: product.desc || `Buy ${product.name} at MyFoodAngels`,
         type: "website",
         url: `https://myfoodangels.com/${slug}`,
         siteName: "MyFoodAngels",
         images: [
            {
               url: product.image || "/default-product-image.jpg",
               width: 800,
               height: 600,
               alt: product.name,
            },
            ...previousImages,
         ],
         locale: "en_US",
      },
      robots: {
         index: true,
         follow: true,
         nocache: false,
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
         icon: "/fav.svg",
         shortcut: "/fav.svg",
         apple: "/fav.svg",
         other: {
            rel: "apple-touch-icon-precomposed",
            url: "/fav.svg",
         },
      },
      twitter: {
         card: "summary_large_image",
         title: `${capitalizeFirstLetter(product.name)} | MyFoodAngels`,
         description: product.desc || `Buy ${product.name} at MyFoodAngels`,
         siteId: "1467726470533754880",
         creator: "@MyFoodAngels",
         creatorId: "1467726470533754880",
         images: [product.image || "/default-product-image.jpg"],
      },
   };
}
async function Page({ params: { id } }: params) {
   const slug = id;
   const singleProduct: SingleProduct | null = (await queryCollectionByField(
      "products",
      slug,
   )) as any;


   if (!slug || !singleProduct) return notFound();


   // Transform the Firestore data to ensure it's safe for Client Components
   function transformFirestoreData(product: any) {
      return {
        ...product,
        created_date: product.created_date
          ? new Date(product.created_date.seconds * 1000).toISOString()
          : "",
      };
    }
  
    // Transform the product data
    const product: SingleProduct = transformFirestoreData(singleProduct);

   return (
      <div className="pt-[4rem]">
         <RouteDisplay route={product?.name || ""} />

         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <ProductDescription
                     product={product}
                     currentItem={{
                        name: product?.name,
                        price: Number(product?.costprice) > 0 &&
                        Number(product?.costprice) < Number(product?.price)
                        ? (Number(product.price) ?? 0)
                        : (Number(product.costprice) ?? 0),
                        no_of_items: product?.no_of_items,
                        id:product?.id,
                        units: product?.units,
                        category: product?.category,
                        subcategory: product?.subcategory,
                        slug: product?.slug,
                        status: product?.status,
                        image: product?.image,
                        quantity: product?.quantity,


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
