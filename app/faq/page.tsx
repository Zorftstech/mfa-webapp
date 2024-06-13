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

// const FAQList: IFAQObj[] = [
//    {
//       question: "What do we do?",
//       answer:
//          "We are a foodtech online marketplace where fresh food is shopped and delivered quickly across Africa.",
//    },
//    {
//       question: "What are our products and services?",
//       answer:
//          "<p>We do:</p><ul><li>Market runs</li><li>Fruits and veggies, seafood,</li><li>Daily meat sharing: goat, cow ram, livestock</li><li>Food bundle</li><li>Food subscription (weekly/monthly)</li><li>Bulk food sharing</li><li>Cooked food delivery</li></ul>",
//    },
//    {
//       question: "How does market runs work?",
//       answer: "<p>You place your order via our website:</p><a>www.myfoodangels.com</a>",
//    },
//    {
//       question: "Do you shop everyday?",
//       answer: "We shop from mondays to saturdays however we take orders on sundays.",
//    },
//    {
//       question: "Do you do same day delivery?",
//       answer: "No, we don't do same day delivery, orders placed today will be delivered tomorrow.",
//    },
//    {
//       question: "What are your delivery days?",
//       answer: "Delivery days are mondays to saturdays",
//    },
//    {
//       question: "How do I place my order?",
//       answer:
//          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat libero nec turpis scelerisque, nec tristique velit euismod. Duis sit amet nulla a.",
//    },
//    {
//       question: "What happens if you don't find my items?",
//       answer:
//          "This is rare but if it happens you get a call from us for an alternative or a refund.",
//    },
//    {
//       question: "What payment method should I use?",
//       answer: "Direct bank transfer, USSD, ONLINE PAYMENT.",
//    },
//    {
//       question: "Can I return a product?",
//       answer: "YES if confirmed upon delivery.",
//    },
//    {
//       question: "About our E-wallet",
//       answer: "Get extra discounts when you load your E-wallet.",
//    },
// ];

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
