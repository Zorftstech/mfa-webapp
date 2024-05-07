import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import HeaderText from "@/components/ui/header-text";
import { Text } from "@/components/ui/text";
import herobg from "@/images/about-us.png";
import Image from "next/image";
import vegetables from "@/images/Vegetables Box.png";
import truck from "@/images/Truck.png";
import love from "@/images/love.png";
import farmer from "@/images/Farmer.png";
import vision from "@/images/vision.png";
import mission from "@/images/mission.png";
import services from "@/images/services.png";

const group = [
   { id: 1, tag: "Fresh Products", imageLink: vegetables, color: "bg-black", value: "500" },
   { id: 2, tag: "Drives Made", imageLink: truck, color: "bg-[#ec2200]", value: "7,000" },
   { id: 3, tag: "Awesome Reviews", imageLink: love, color: "bg-[#7ab42c]", value: "5,000" },
   { id: 4, tag: "Awesome Customers", imageLink: farmer, color: "bg-[#f67b00]", value: "50" },
];

const about_us = [
   {
      id: 1,
      tag: "Our Vision",
      imageLink: vision,
      subTag: "To be the number 1 food shopping and delivery platform in Africa.",
   },
   {
      id: 2,
      tag: "Our Mission",
      imageLink: mission,
      subTag:
         "Our mission is to create an Africa where everyone has easy and quick access to affordable fresh food.",
   },
   {
      id: 3,
      tag: "Our Services",
      imageLink: services,
      subTag:
         "We offer fresh food delivery services. Our services spread across farm-fresh produce, to freshly cooked meals and juices. Whatever your need, we are here to fulfill.",
   },
];

function page() {
   return (
      <div className="pt-[69px]">
         <RouteDisplay route={"About Us"} />
         <Container>
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center py-4">
               <div className="mb-6 flex w-full flex-col items-start justify-between gap-2 md:flex-row">
                  <div className="w-full flex-1 p-2">
                     <Text className="text-[#7ab42c]" size={"sm"}>
                        Welcome to MYFOODANGELS.COM
                     </Text>
                     <HeaderText
                        text="Healthy, Quality & Standard Farm Products"
                        color="black"
                        position="left"
                     />
                     <div className="mt-4 flex w-full flex-1 items-start justify-center md:hidden">
                        <Image src={herobg} className="w-[50%]" alt="Hero" />
                     </div>
                     <Text className="text-gray-500" size={"sm"} weight={"medium"}>
                        Africa is blessed with fertile lands and an abundance of food. The daily
                        post harvest loss due to the inadequate availability of storage and
                        transportation facilities from the farms to the markets remain our drive at
                        what we do. We are much more than a food delivery service. We are disrupting
                        the whole african supply chain, one link at a time. MY FOOD ANGELS DOT COM
                        LIMITED is a business setup to meet the food requirements of today’s people
                        and businesses with little or no time to shop for required food items,
                        farmers who need their food to reach the consumers who naturally find going
                        to the market a herculean task.
                     </Text>
                  </div>
                  <div className="hidden w-full flex-1 items-start justify-center md:flex">
                     <Image src={herobg} className="w-[75%]" alt="Hero" />
                  </div>
               </div>
               <div className="grid w-full grid-cols-2 gap-2 px-5 py-2 md:grid-cols-4 md:gap-0">
                  {group.map((item) => (
                     <div
                        key={item.id}
                        className={`${item.color} flex flex-col items-center justify-center gap-2 p-4`}
                     >
                        <Image src={item.imageLink} alt={item.tag} className="w-10" />
                        <Text
                           size={"3xl"}
                           weight={"semibold"}
                           className="my-4 text-center text-white"
                        >
                           {item.value}
                        </Text>
                        <Text weight={"medium"} className="text-center text-white">
                           {item.tag}
                        </Text>
                     </div>
                  ))}
               </div>
               <div className="my-4 grid w-full grid-cols-1 gap-2 px-5 py-2 lg:grid-cols-2">
                  <div className="">
                     {about_us.map((item: any) => (
                        <div
                           key={item.id}
                           className="mb-4 flex w-full items-center justify-start gap-2 p-4"
                        >
                           <Image src={item.imageLink} alt="" />
                           <div>
                              <HeaderText color="black" text={item.tag} position="left" />
                              <Text className="text-gray-500" size={"sm"}>
                                 {item.subTag}
                              </Text>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="h-[300px] overflow-hidden rounded-2xl lg:h-full">
                     <iframe
                        className="h-full w-full"
                        src="https://www.youtube.com/embed/oRVSAJ5P92U"
                        allowFullScreen={true}
                     ></iframe>
                  </div>
               </div>
            </main>
         </Container>
      </div>
   );
}

export default page;
