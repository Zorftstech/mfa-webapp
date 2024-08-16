import { IFAQObj } from "@/components/faqs/faq-data";

import LadyHoldingFruitBasket from "@/public/images/faq/lady-holding-food-basket.png";

import { Accordion } from "@/components/ui/accordion";
import WithRouteDisplay from "@/components/shared/with-route-display";
import FAQItem from "@/components/faqs/faqitem";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import ShopFarmProductBanner from "@/components/shared/ShopFarmProductBanner";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCreatedDateFromDocument } from "@/lib/utils";
export const revalidate = 60;

async function Page() {
   const FAQsCollectionRef = collection(db, "faq");
   const querySnapshot = await getDocs(FAQsCollectionRef);
   const FAQs: any = [];
   querySnapshot.forEach((doc) => {
      const createdDate = getCreatedDateFromDocument(doc as any);
      FAQs.push({
         id: doc.id,
         ...doc.data(),
         createdDate,
      });
   });
   const FAQList: IFAQObj[] = FAQs;
   return (
      <div>
         <WithRouteDisplay route="FAQs" extraChildrenClassname="pb-0">
            <div className="flex w-full grid-cols-2 flex-col-reverse gap-x-12 md:grid md:pt-20">
               <div className="pb-20">
                  <Text className="mb-4 mt-8 hidden font-semibold leading-[110%]  text-[#1A1A1A] md:block md:text-[33px] lg:text-[48px]">
                     Welcome, Let’s Talk About MyFoodAngels
                  </Text>
                  <Accordion type="single" collapsible>
                     {FAQList.map((faq, idx) => (
                        <FAQItem key={idx + faq.question} faqDetail={faq} />
                     ))}
                  </Accordion>
               </div>
               <div className="relative mb-10 w-full md:mb-0">
                  <div className="] bottom-0 hidden h-[85%] w-full rounded-t-full bg-[#7AB42C] md:absolute lg:block"></div>

                  <Image
                     src={LadyHoldingFruitBasket}
                     alt=""
                     className="right-0 rounded-t-full bg-[#7AB42c] object-cover object-top md:absolute md:bottom-0 lg:h-full lg:bg-transparent lg:object-cover "
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
