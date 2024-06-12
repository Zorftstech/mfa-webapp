import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Tag, LeafIcon } from "lucide-react";
import React from "react";

import DescriptionTab from "./description-tab";
import FeedbackTab from "./feedback-tab";
import InformationTab from "./information-tab";
import { SingleProduct } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ratings } from "@/components/ui/rating";
interface FeedbackInformationProps {
   currentItem: SingleProduct;
}
export function FeedbackInformation({ currentItem }: FeedbackInformationProps) {
   return (
      <Tabs defaultValue="description" className="w-full">
         <TabsList className="grid w-full grid-cols-3 border-b border-gray-200">
            <TabsTrigger value="description" className="text-wrap">
               <Text size={"xs"} weight={"medium"}>
                  Description
               </Text>
            </TabsTrigger>
            <TabsTrigger value="information" className="text-wrap">
               <Text size={"xs"} weight={"medium"}>
                  Additional Information
               </Text>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-wrap">
               <Text size={"xs"} weight={"medium"}>
                  Customer Feedback
               </Text>
            </TabsTrigger>
         </TabsList>
         {/* description tab */}
         <TabsContent value="description">
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
               <Text className="text-gray-500" size={"xs"} weight={"medium"}>
                  {currentItem?.desc || "No description available"}
               </Text>
               <div className="hidden w-full">
                  <iframe
                     className="h-[250px] w-full border border-gray-200"
                     src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                     allowFullScreen={true}
                  ></iframe>
                  <div className="mt-4 flex w-full items-center justify-between gap-2 border border-gray-200">
                     <div className="flex flex-1 items-center justify-between gap-4 p-4">
                        <Tag className="w-6 text-green-600" />
                        <span className="flex-1">
                           <Text size={"md"} weight={"semibold"}>
                              64% Discount
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              Save your 64% money with us
                           </Text>
                        </span>
                     </div>
                     <div className="flex flex-1 items-center justify-between gap-4 p-4">
                        <LeafIcon className="w-6 text-green-600" />
                        <span className="flex-1">
                           <Text size={"md"} weight={"semibold"}>
                              100% Organic
                           </Text>
                           <Text size={"sm"} weight={"medium"}>
                              100% Organic Vegetables
                           </Text>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </TabsContent>
         {/* information tab */}
         <TabsContent value="information">
            <div className="mx-auto flex w-full max-w-[500px] flex-col items-start justify-start gap-4">
               <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
                  <Text size={"sm"} weight={"medium"}>
                     Weight: <span className="text-gray-400">03</span>
                  </Text>
               </div>
               <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
                  <Text size={"sm"} weight={"medium"}>
                     Color: <span className="text-gray-400">Green</span>
                  </Text>
               </div>
               <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
                  <Text size={"sm"} weight={"medium"}>
                     Type: <span className="text-gray-400">Organic</span>
                  </Text>
               </div>
               <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
                  <Text size={"sm"} weight={"medium"}>
                     Category: <span className="text-gray-400">Fruits</span>
                  </Text>
               </div>
               <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
                  <Text size={"sm"} weight={"medium"}>
                     Stock Status: <span className="text-gray-400">Available (5,413)</span>
                  </Text>
               </div>
               <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
                  <Text size={"sm"} weight={"medium"}>
                     Tag:{" "}
                     <span className="text-gray-400">Vegetables Citrus Cabbage Green Cabbage</span>
                  </Text>
               </div>
            </div>
         </TabsContent>
         {/*feedback tab */}
         <TabsContent value="feedback">
            <div className="mx-auto w-full max-w-[500px] py-3">
               <div className="border-b border-gray-300 p-3">
                  <div className="mb-3 flex items-center justify-between ">
                     <div className="flex items-center gap-2">
                        <Avatar>
                           <AvatarImage
                              className="h-full w-full rounded-[inherit] object-cover"
                              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                              alt="Colm Tuite"
                           />
                           <AvatarFallback>{"Customer"}</AvatarFallback>
                        </Avatar>
                        <div>
                           <Text className="mb-1" weight={"medium"} size={"sm"}>
                              Daniel Olatunji
                           </Text>

                           <Ratings value={5} />
                        </div>
                     </div>
                     <Text weight={"medium"} size={"xs"}>
                        Customer
                     </Text>
                  </div>
                  <Text size={"xs"}>
                     A delightful choice for those seeking sweetness and tanginess in every bite
                  </Text>
               </div>
               <div className="border-b border-gray-300 p-3">
                  <div className="mb-3 flex items-center justify-between ">
                     <div className="flex items-center gap-2">
                        <Avatar>
                           <AvatarImage
                              className="h-full w-full rounded-[inherit] object-cover"
                              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                              alt="Colm Tuite"
                           />
                           <AvatarFallback>{"Customer"}</AvatarFallback>
                        </Avatar>
                        <div>
                           <Text className="mb-1" weight={"medium"} size={"sm"}>
                              Daniel Olatunji
                           </Text>

                           <Ratings value={5} />
                        </div>
                     </div>
                     <Text weight={"medium"} size={"xs"}>
                        Customer
                     </Text>
                  </div>
                  <Text size={"xs"}>
                     A delightful choice for those seeking sweetness and tanginess in every bite
                  </Text>
               </div>
            </div>
         </TabsContent>
      </Tabs>
   );
}
