"use client";

import { FAQList, IFAQObj } from "@/components/faqs/faq-data";
import Each from "@/components/helpers/each";

import LadyHoldingFruitBasket from "@/public/images/faq/lady-holding-food-basket.png";

import { Accordion } from "@/components/ui/accordion";
import WithRouteDisplay from "@/components/shared/with-route-display";
import FAQItem from "@/components/faqs/faqitem";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import ShopFarmProductBanner from "@/components/shared/ShopFarmProductBanner";

function Page() {
   return (
      <div>
         <WithRouteDisplay route="FAQs" extraChildrenClassname="pb-0">
            <div className="flex w-full grid-cols-2 flex-col-reverse gap-x-12 md:grid md:pt-20">
               <div className="pb-20">
                  <Text className="mb-4 mt-8 hidden text-[48px]  font-semibold text-[#1A1A1A] md:block">
                     Welcome, Let’s Talk About MyFoodAngels
                  </Text>
                  <Accordion type="single" collapsible>
                     {FAQList.map((faq, idx) => (
                        <FAQItem key={idx + faq.question} faqDetail={faq} />
                     ))}
                  </Accordion>
               </div>
               <div className="relative mb-10 w-full md:mb-0">
                  <Image
                     src={LadyHoldingFruitBasket}
                     alt=""
                     className="h-full object-cover object-top md:absolute md:right-[-16px]"
                  />
               </div>
               <Text className="mb-4 mt-8 text-center text-[36px] font-semibold text-[#1A1A1A] md:hidden">
                  Welcome, Let’s Talk About MyFoodAngels
               </Text>
            </div>
         </WithRouteDisplay>
         <ShopFarmProductBanner />
      </div>
   );
}

export default Page;
